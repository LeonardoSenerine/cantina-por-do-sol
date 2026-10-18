import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { addDays, isISODate, nowIn, weekdayOf } from '../common/dates.js';
import type { Env } from '../config/env.js';
import {
  findExperience,
  slotsFor,
  type Experience,
} from '../experiences/experiences.data.js';
import type { CreateReservationDto } from './dto/create-reservation.dto.js';
import type { ListReservationsDto } from './dto/list-reservations.dto.js';
import type { Reservation, ReservationStatus } from './reservation.entity.js';
import { ReservationsRepository } from './reservations.repository.js';

// até quantos dias à frente aceitamos reserva
export const MAX_DAYS_AHEAD = 120;

const DAY_NAMES = [
  'domingo',
  'segunda',
  'terça',
  'quarta',
  'quinta',
  'sexta',
  'sábado',
];

@Injectable()
export class ReservationsService {
  constructor(
    private readonly repo: ReservationsRepository,
    private readonly config: ConfigService<Env, true>,
  ) {}

  create(dto: CreateReservationDto, now = new Date()) {
    const exp = findExperience(dto.experience);
    if (!exp)
      throw new BadRequestException({
        field: 'experience',
        message: 'Experiência inválida',
      });
    this.assertBookable(dto, exp, now);

    const reservation = this.repo.create(dto);
    return { reservation, whatsappUrl: this.whatsappUrl(reservation, exp) };
  }

  list(filter: ListReservationsDto) {
    return this.repo.list(filter);
  }

  get(id: number) {
    const r = this.repo.findById(id);
    if (!r) throw new NotFoundException('Reserva não encontrada');
    return r;
  }

  updateStatus(id: number, status: ReservationStatus) {
    const r = this.repo.updateStatus(id, status);
    if (!r) throw new NotFoundException('Reserva não encontrada');
    return r;
  }

  // mesmas regras do painel de reserva do site
  private assertBookable(
    dto: CreateReservationDto,
    exp: Experience,
    now: Date,
  ) {
    const fail = (field: string, message: string) => {
      throw new BadRequestException({ field, message });
    };
    if (!isISODate(dto.date)) fail('date', 'Data inválida');
    if (!exp.weekdays.includes(weekdayOf(dto.date))) {
      fail('date', `${exp.name} só acontece ${exp.days.toLowerCase()}`);
    }
    if (!slotsFor(exp, weekdayOf(dto.date)).includes(dto.time))
      fail('time', 'Horário indisponível para esta experiência');

    const today = nowIn(this.config.get('TIMEZONE', { infer: true }), now);
    if (
      dto.date < today.date ||
      (dto.date === today.date && dto.time <= today.time)
    ) {
      fail('date', 'Essa data já passou');
    }
    if (dto.date > addDays(today.date, MAX_DAYS_AHEAD)) {
      fail('date', `Reservas com até ${MAX_DAYS_AHEAD} dias de antecedência`);
    }
  }

  // mensagem igual à que o site monta, para a casa confirmar pelo WhatsApp
  private whatsappUrl(r: Reservation, exp: Experience) {
    const [, m, d] = r.date.split('-');
    const people = [`${r.adults} ${r.adults === 1 ? 'adulto' : 'adultos'}`];
    if (r.kids69 > 0)
      people.push(
        `${r.kids69} ${r.kids69 === 1 ? 'criança' : 'crianças'} de 6 a 9 anos`,
      );
    if (r.kids05 > 0)
      people.push(
        `${r.kids05} ${r.kids05 === 1 ? 'criança' : 'crianças'} até 5 anos`,
      );
    const lines = [
      `Olá! Gostaria de reservar o *${exp.name.toLowerCase()}* para *${DAY_NAMES[weekdayOf(r.date)]}, ${d}/${m}*, às *${r.time.replace(':', 'h')}*.`,
      `Seremos ${people.join(', ')}.`,
      `Nome: ${r.name}`,
    ];
    if (r.notes) lines.push(`Observação: ${r.notes}`);
    lines.push(`(Reserva nº ${r.id}, enviada pelo site)`);
    return `https://wa.me/${this.config.get('WHATSAPP', { infer: true })}?text=${encodeURIComponent(lines.join('\n'))}`;
  }
}

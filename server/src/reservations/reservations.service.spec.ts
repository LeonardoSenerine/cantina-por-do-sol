import { BadRequestException } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { Env } from '../config/env.js';
import type { CreateReservationDto } from './dto/create-reservation.dto.js';
import type { ReservationsRepository } from './reservations.repository.js';
import { ReservationsService } from './reservations.service.js';

// quarta-feira, 14/10/2026, 15h em São Paulo
const NOW = new Date('2026-10-14T18:00:00Z');

const config = {
  get: (key: keyof Env) =>
    ({ TIMEZONE: 'America/Sao_Paulo', WHATSAPP: '5549988637476' })[
      key as string
    ],
} as unknown as ConfigService<Env, true>;

const repo = {
  create: (dto: CreateReservationDto) =>
    Object.assign(
      { id: 7, status: 'pending', createdAt: '', updatedAt: '' },
      dto,
      {
        phone: dto.phone ?? null,
        notes: dto.notes ?? null,
      },
    ),
} as unknown as ReservationsRepository;

const pizza = (
  over: Partial<CreateReservationDto> = {},
): CreateReservationDto => ({
  experience: 'pizza',
  date: '2026-10-16', // sexta
  time: '19:30',
  adults: 2,
  kids69: 0,
  kids05: 0,
  name: 'Maria',
  ...over,
});

const fieldOf = (fn: () => unknown) => {
  try {
    fn();
  } catch (err) {
    expect(err).toBeInstanceOf(BadRequestException);
    return ((err as BadRequestException).getResponse() as { field: string })
      .field;
  }
  throw new Error('esperava erro');
};

describe('ReservationsService', () => {
  const service = new ReservationsService(repo, config);

  it('cria reserva válida e devolve o link do WhatsApp', () => {
    const { reservation, whatsappUrl } = service.create(
      pizza({ kids69: 1 }),
      NOW,
    );
    expect(reservation.id).toBe(7);
    expect(whatsappUrl.startsWith('https://wa.me/5549988637476?text=')).toBe(
      true,
    );
    const text = decodeURIComponent(whatsappUrl.split('text=')[1]);
    expect(text).toContain(
      '*rodízio de pizzas* para *sexta, 16/10*, às *19h30*',
    );
    expect(text).toContain('2 adultos, 1 criança de 6 a 9 anos');
    expect(text).toContain('Reserva nº 7');
  });

  it('recusa dia em que a experiência não acontece', () => {
    expect(
      fieldOf(() => service.create(pizza({ date: '2026-10-18' }), NOW)),
    ).toBe('date'); // domingo
    expect(
      fieldOf(() =>
        service.create(
          pizza({ experience: 'cafe', date: '2026-10-16', time: '09:00' }),
          NOW,
        ),
      ),
    ).toBe('date');
  });

  it('recusa horário fora da lista', () => {
    expect(fieldOf(() => service.create(pizza({ time: '17:00' }), NOW))).toBe(
      'time',
    );
  });

  it('recusa data inexistente, passada ou longe demais', () => {
    expect(
      fieldOf(() => service.create(pizza({ date: '2026-02-30' }), NOW)),
    ).toBe('date');
    expect(
      fieldOf(() => service.create(pizza({ date: '2026-10-10' }), NOW)),
    ).toBe('date');
    expect(
      fieldOf(() => service.create(pizza({ date: '2027-06-04' }), NOW)),
    ).toBe('date');
  });

  it('no próprio dia, só aceita horário que ainda não passou', () => {
    const fridayNight = new Date('2026-10-16T22:45:00Z'); // 19h45 em SP
    expect(
      fieldOf(() => service.create(pizza({ time: '19:30' }), fridayNight)),
    ).toBe('date');
    expect(
      service.create(pizza({ time: '20:00' }), fridayNight).reservation.time,
    ).toBe('20:00');
  });

  it('café colonial aos domingos', () => {
    const { reservation } = service.create(
      pizza({ experience: 'cafe', date: '2026-10-18', time: '09:00' }),
      NOW,
    );
    expect(reservation.experience).toBe('cafe');
    expect(
      fieldOf(() =>
        service.create(
          pizza({ experience: 'cafe', date: '2026-10-18', time: '12:00' }),
          NOW,
        ),
      ),
    ).toBe('time'); // meio-dia é hora do almoço
  });

  it('almoço aos domingos', () => {
    const { reservation } = service.create(
      pizza({ experience: 'almoco', date: '2026-10-18', time: '12:00' }),
      NOW,
    );
    expect(reservation.experience).toBe('almoco');
  });
});

import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import type { CreateReservationDto } from './dto/create-reservation.dto.js';
import type { ListReservationsDto } from './dto/list-reservations.dto.js';
import type { Reservation, ReservationStatus } from './reservation.entity.js';

// linha como está na tabela (ver migrations.ts)
interface Row {
  id: number;
  experience: Reservation['experience'];
  date: string;
  time: string;
  adults: number;
  kids_6_9: number;
  kids_0_5: number;
  name: string;
  phone: string | null;
  notes: string | null;
  status: ReservationStatus;
  created_at: string;
  updated_at: string;
}

const toReservation = (r: Row): Reservation => ({
  id: r.id,
  experience: r.experience,
  date: r.date,
  time: r.time,
  adults: r.adults,
  kids69: r.kids_6_9,
  kids05: r.kids_0_5,
  name: r.name,
  phone: r.phone,
  notes: r.notes,
  status: r.status,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

@Injectable()
export class ReservationsRepository {
  constructor(private readonly db: DatabaseService) {}

  create(dto: CreateReservationDto): Reservation {
    const row = this.db.connection
      .prepare(
        `INSERT INTO reservations (experience, date, time, adults, kids_6_9, kids_0_5, name, phone, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         RETURNING *`,
      )
      .get(
        dto.experience,
        dto.date,
        dto.time,
        dto.adults,
        dto.kids69,
        dto.kids05,
        dto.name,
        dto.phone || null,
        dto.notes || null,
      ) as unknown as Row;
    return toReservation(row);
  }

  findById(id: number): Reservation | undefined {
    const row = this.db.connection
      .prepare('SELECT * FROM reservations WHERE id = ?')
      .get(id) as unknown as Row | undefined;
    return row && toReservation(row);
  }

  list(filter: ListReservationsDto): Reservation[] {
    const conditions: [string, string | undefined][] = [
      ['date >= ?', filter.from],
      ['date <= ?', filter.to],
      ['experience = ?', filter.experience],
      ['status = ?', filter.status],
    ];
    const active = conditions.filter(([, value]) => value !== undefined);
    const where = active.map(([clause]) => clause);
    const params = active.map(([, value]) => value as string);

    const sql = `SELECT * FROM reservations ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
                 ORDER BY date, time, id`;
    return (
      this.db.connection.prepare(sql).all(...params) as unknown as Row[]
    ).map(toReservation);
  }

  updateStatus(id: number, status: ReservationStatus): Reservation | undefined {
    const row = this.db.connection
      .prepare(
        `UPDATE reservations
         SET status = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
         WHERE id = ?
         RETURNING *`,
      )
      .get(status, id) as unknown as Row | undefined;
    return row && toReservation(row);
  }
}

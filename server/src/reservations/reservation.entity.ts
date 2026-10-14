import type { ExperienceId } from '../experiences/experiences.data.js';

export const RESERVATION_STATUSES = [
  'pending',
  'confirmed',
  'cancelled',
] as const;
export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];

export interface Reservation {
  id: number;
  experience: ExperienceId;
  date: string;
  time: string;
  adults: number;
  kids69: number;
  kids05: number;
  name: string;
  phone: string | null;
  notes: string | null;
  status: ReservationStatus;
  createdAt: string;
  updatedAt: string;
}

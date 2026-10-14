// Regras de reserva de cada experiência. Espelham EXPERIENCES em ../../../src/data/site.js
// (o site): se mudar dia ou horário lá, mude aqui também.

export interface Experience {
  id: ExperienceId;
  name: string;
  days: string;
  hours: string;
  // 0 = domingo ... 6 = sábado
  weekdays: number[];
  slots: string[];
}

export const EXPERIENCE_IDS = ['cafe', 'almoco', 'pizza'] as const;
export type ExperienceId = (typeof EXPERIENCE_IDS)[number];

export const EXPERIENCES: Experience[] = [
  {
    id: 'cafe',
    name: 'Café colonial',
    days: 'Aos domingos',
    hours: '8h às 10h30 e 15h às 18h',
    weekdays: [0],
    slots: [
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
    ],
  },
  {
    id: 'almoco',
    name: 'Almoço',
    days: 'Aos domingos',
    hours: '11h às 14h30',
    weekdays: [0],
    slots: ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30'],
  },
  {
    id: 'pizza',
    name: 'Rodízio de pizzas',
    days: 'De quinta a sábado',
    hours: '18h30 à meia-noite',
    weekdays: [4, 5, 6],
    slots: [
      '18:30',
      '19:00',
      '19:30',
      '20:00',
      '20:30',
      '21:00',
      '21:30',
      '22:00',
    ],
  },
];

export const findExperience = (id: string) =>
  EXPERIENCES.find((e) => e.id === id);

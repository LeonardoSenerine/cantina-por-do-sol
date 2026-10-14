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

export const EXPERIENCE_IDS = ['cafe', 'pizza'] as const;
export type ExperienceId = (typeof EXPERIENCE_IDS)[number];

export const EXPERIENCES: Experience[] = [
  {
    id: 'cafe',
    name: 'Café colonial',
    days: 'Domingos',
    hours: '8h às 18h',
    weekdays: [0],
    slots: [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
    ],
  },
  {
    id: 'pizza',
    name: 'Rodízio de pizzas',
    days: 'Quinta a sábado',
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

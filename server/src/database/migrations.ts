// Migrações em ordem. Nunca edite uma que já rodou em produção: acrescente uma nova no fim.

export const MIGRATIONS: { id: number; name: string; sql: string }[] = [
  {
    id: 1,
    name: 'create_reservations',
    sql: `
      CREATE TABLE reservations (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        experience  TEXT    NOT NULL,
        date        TEXT    NOT NULL,
        time        TEXT    NOT NULL,
        adults      INTEGER NOT NULL,
        kids_6_9    INTEGER NOT NULL DEFAULT 0,
        kids_0_5    INTEGER NOT NULL DEFAULT 0,
        name        TEXT    NOT NULL,
        phone       TEXT,
        notes       TEXT,
        status      TEXT    NOT NULL DEFAULT 'pending',
        created_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
        updated_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
      );
      CREATE INDEX idx_reservations_date ON reservations (date, time);
      CREATE INDEX idx_reservations_status ON reservations (status);
    `,
  },
];

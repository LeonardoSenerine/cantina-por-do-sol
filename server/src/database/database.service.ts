import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from '../config/env.js';
import { MIGRATIONS } from './migrations.js';

// SQLite embutido no Node (node:sqlite): sem servidor de banco e sem dependência nativa.
// Todo acesso ao banco passa por aqui, então trocar por Postgres depois mexe só nesta pasta
// e nos repositórios.
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private db!: DatabaseSync;

  constructor(private readonly config: ConfigService<Env, true>) {}

  onModuleInit() {
    const path = this.config.get('DATABASE_PATH', { infer: true });
    if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true });

    this.db = new DatabaseSync(path);
    this.db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
    this.migrate();
  }

  onModuleDestroy() {
    this.db?.close();
  }

  get connection(): DatabaseSync {
    return this.db;
  }

  transaction<T>(fn: () => T): T {
    this.db.exec('BEGIN');
    try {
      const result = fn();
      this.db.exec('COMMIT');
      return result;
    } catch (err) {
      this.db.exec('ROLLBACK');
      throw err;
    }
  }

  private migrate() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
      );
    `);
    const applied = new Set(
      this.db
        .prepare('SELECT id FROM _migrations')
        .all()
        .map((row) => Number(row.id)),
    );

    for (const m of MIGRATIONS) {
      if (applied.has(m.id)) continue;
      this.transaction(() => {
        this.db.exec(m.sql);
        this.db
          .prepare('INSERT INTO _migrations (id, name) VALUES (?, ?)')
          .run(m.id, m.name);
      });
      this.logger.log(`Migração ${m.id} (${m.name}) aplicada`);
    }
  }
}

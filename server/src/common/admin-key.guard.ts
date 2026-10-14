import { timingSafeEqual } from 'node:crypto';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import type { Env } from '../config/env.js';

// Proteção simples das rotas de administração: header `x-admin-key` igual a ADMIN_API_KEY.
// Quando houver painel com login de verdade, troque por autenticação com usuário.
@Injectable()
export class AdminKeyGuard implements CanActivate {
  private readonly key: Buffer;

  constructor(config: ConfigService<Env, true>) {
    this.key = Buffer.from(config.get('ADMIN_API_KEY', { infer: true }));
  }

  canActivate(context: ExecutionContext): boolean {
    const header =
      context.switchToHttp().getRequest<Request>().header('x-admin-key') ?? '';
    const given = Buffer.from(header);
    if (given.length !== this.key.length || !timingSafeEqual(given, this.key)) {
      throw new UnauthorizedException('Chave de administração inválida');
    }
    return true;
  }
}

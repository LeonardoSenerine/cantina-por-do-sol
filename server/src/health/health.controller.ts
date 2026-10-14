import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { DatabaseService } from '../database/database.service.js';

@ApiTags('saúde')
@SkipThrottle()
@Controller('health')
export class HealthController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  check() {
    this.db.connection.prepare('SELECT 1').get();
    return { status: 'ok', uptime: Math.round(process.uptime()) };
  }
}

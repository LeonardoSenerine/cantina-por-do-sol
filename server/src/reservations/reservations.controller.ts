import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AdminKeyGuard } from '../common/admin-key.guard.js';
import { CreateReservationDto } from './dto/create-reservation.dto.js';
import { ListReservationsDto } from './dto/list-reservations.dto.js';
import { UpdateStatusDto } from './dto/update-status.dto.js';
import { ReservationsService } from './reservations.service.js';

@ApiTags('reservas')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservations: ReservationsService) {}

  // público: chamado pelo painel de reserva do site
  @Post()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  create(@Body() dto: CreateReservationDto) {
    return this.reservations.create(dto);
  }

  // daqui para baixo: só a casa, com a chave de administração
  @Get()
  @UseGuards(AdminKeyGuard)
  @ApiSecurity('admin')
  list(@Query() filter: ListReservationsDto) {
    return this.reservations.list(filter);
  }

  @Get(':id')
  @UseGuards(AdminKeyGuard)
  @ApiSecurity('admin')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.reservations.get(id);
  }

  @Patch(':id/status')
  @UseGuards(AdminKeyGuard)
  @ApiSecurity('admin')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.reservations.updateStatus(id, dto.status);
  }
}

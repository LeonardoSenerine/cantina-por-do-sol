import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import {
  RESERVATION_STATUSES,
  type ReservationStatus,
} from '../reservation.entity.js';

export class UpdateStatusDto {
  @ApiProperty({ enum: RESERVATION_STATUSES })
  @IsIn(RESERVATION_STATUSES)
  status: ReservationStatus;
}

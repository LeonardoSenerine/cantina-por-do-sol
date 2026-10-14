import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, Matches } from 'class-validator';
import {
  EXPERIENCE_IDS,
  type ExperienceId,
} from '../../experiences/experiences.data.js';
import {
  RESERVATION_STATUSES,
  type ReservationStatus,
} from '../reservation.entity.js';

export class ListReservationsDto {
  @ApiPropertyOptional({ description: 'A partir desta data (AAAA-MM-DD)' })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  from?: string;

  @ApiPropertyOptional({ description: 'Até esta data, inclusive (AAAA-MM-DD)' })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  to?: string;

  @ApiPropertyOptional({ enum: EXPERIENCE_IDS })
  @IsOptional()
  @IsIn(EXPERIENCE_IDS)
  experience?: ExperienceId;

  @ApiPropertyOptional({ enum: RESERVATION_STATUSES })
  @IsOptional()
  @IsIn(RESERVATION_STATUSES)
  status?: ReservationStatus;
}

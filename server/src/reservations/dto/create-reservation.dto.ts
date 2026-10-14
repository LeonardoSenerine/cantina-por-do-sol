import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import {
  EXPERIENCE_IDS,
  type ExperienceId,
} from '../../experiences/experiences.data.js';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class CreateReservationDto {
  @ApiProperty({ enum: EXPERIENCE_IDS, example: 'pizza' })
  @IsIn(EXPERIENCE_IDS, { message: 'Experiência inválida' })
  experience: ExperienceId;

  @ApiProperty({ example: '2026-10-16', description: 'AAAA-MM-DD' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Data no formato AAAA-MM-DD' })
  date: string;

  @ApiProperty({
    example: '19:30',
    description: 'HH:MM, um dos horários da experiência',
  })
  @Matches(/^\d{2}:\d{2}$/, { message: 'Horário no formato HH:MM' })
  time: string;

  @ApiProperty({ example: 2, minimum: 1, maximum: 40 })
  @IsInt()
  @Min(1, { message: 'Pelo menos 1 adulto' })
  @Max(40, {
    message: 'Para grupos acima de 40 pessoas, fale direto pelo WhatsApp',
  })
  adults: number;

  @ApiPropertyOptional({
    example: 0,
    description: 'Crianças de 6 a 9 anos (pagam metade)',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(30)
  kids69 = 0;

  @ApiPropertyOptional({ example: 0, description: 'Crianças até 5 anos' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(30)
  kids05 = 0;

  @ApiProperty({ example: 'Maria Silva' })
  @Transform(trim)
  @IsString()
  @Length(2, 80, { message: 'Nome entre 2 e 80 caracteres' })
  name: string;

  @ApiPropertyOptional({ example: '(49) 99999-0000' })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/\D/g, '') : value,
  )
  @Matches(/^\d{10,13}$/, { message: 'Telefone com DDD' })
  phone?: string;

  @ApiPropertyOptional({ example: 'Aniversário, mesa perto da janela' })
  @IsOptional()
  @Transform(trim)
  @IsString()
  @MaxLength(500)
  notes?: string;
}

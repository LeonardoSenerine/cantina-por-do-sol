import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EXPERIENCES, findExperience } from './experiences.data.js';

@ApiTags('experiências')
@Controller('experiences')
export class ExperiencesController {
  @Get()
  list() {
    return EXPERIENCES;
  }

  @Get(':id')
  get(@Param('id') id: string) {
    const exp = findExperience(id);
    if (!exp) throw new NotFoundException('Experiência não encontrada');
    return exp;
  }
}

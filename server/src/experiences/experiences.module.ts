import { Module } from '@nestjs/common';
import { ExperiencesController } from './experiences.controller.js';

@Module({
  controllers: [ExperiencesController],
})
export class ExperiencesModule {}

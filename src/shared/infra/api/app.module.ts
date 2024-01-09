import { Module } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

@Module({
  imports: [],
  providers: [PrismaService],
})
export class AppModule {}

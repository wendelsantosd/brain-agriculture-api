import { FarmerModule } from '@modules/farmer';
import { Module } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

@Module({
  imports: [FarmerModule],
  providers: [PrismaService],
})
export class AppModule {}

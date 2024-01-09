import { Module } from '@nestjs/common';
import { farmerController } from './farmer.controller';
import { FarmerService } from './farmer.service';

@Module({
  controllers: [farmerController],
  providers: [FarmerService],
})
export class FarmerModule {}

import { FarmerRepository } from '@modules/farmer/infra';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { CalculateUseCase } from '../useCases';

export const makeCalculate = (): CalculateUseCase =>
  new CalculateUseCase(new FarmerRepository(new PrismaService()));

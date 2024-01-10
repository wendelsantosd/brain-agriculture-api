import { FarmerRepository } from '@modules/farmer/infra';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { DeleteFarmerUseCase } from '../useCases';

export const makeDeleteFarmer = (): DeleteFarmerUseCase =>
  new DeleteFarmerUseCase(new FarmerRepository(new PrismaService()));

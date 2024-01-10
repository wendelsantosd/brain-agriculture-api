import { FarmerRepository } from '@modules/farmer/infra';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { UpdateFarmerUseCase } from '../useCases';

export const makeUpdateFarmer = (): UpdateFarmerUseCase =>
  new UpdateFarmerUseCase(new FarmerRepository(new PrismaService()));

import { FarmerRepository } from '@modules/farmer/infra';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { CreateFarmerUseCase } from '../useCases';

export const makeCreateFarmer = (): CreateFarmerUseCase =>
  new CreateFarmerUseCase(new FarmerRepository(new PrismaService()));

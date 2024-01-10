import { FarmerRepository } from '@modules/farmer/infra';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { GetFarmerByIdUseCase } from '../useCases';

export const makeGetFarmerById = (): GetFarmerByIdUseCase =>
  new GetFarmerByIdUseCase(new FarmerRepository(new PrismaService()));

import { FarmerRepository } from '@modules/farmer/infra';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { GetFarmersUseCase } from '../useCases';

export const makeGetFarmers = (): GetFarmersUseCase =>
  new GetFarmersUseCase(new FarmerRepository(new PrismaService()));

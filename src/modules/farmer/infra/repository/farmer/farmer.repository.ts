import { Farmer, IFarmerRepository } from '@modules/farmer/domain';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { Result } from 'types-ddd';
import { AdapterFarmerDBOToDomain } from '../../adapters';
import { FarmerDBO } from './farmer.dbo';

export class FarmerRepository implements IFarmerRepository {
  constructor(private readonly orm: PrismaService) {}

  async save(farmer: Farmer): Promise<Result<Farmer>> {
    try {
      const adapterFarmer = new AdapterFarmerDBOToDomain();
      const data: FarmerDBO = {
        id: farmer.id.value(),
        name: farmer.name,
        cpfCnpj: farmer.cpfCnpj,
        farmName: farmer.farmName,
        city: farmer.city,
        state: farmer.state,
        totalArea: farmer.totalArea,
        agriculturalArea: farmer.agriculturalArea,
        vegetationArea: farmer.vegetationArea,
        plantedCrops: farmer.plantedCrops,
      };

      const farmerDB = await this.orm.farmers.create({ data });
      const preparedFarmer = adapterFarmer.prepare(farmerDB);
      const buildedFarmer = adapterFarmer.build(preparedFarmer);

      return Result.Ok(buildedFarmer.value());
    } catch (error) {
      return Result.fail(
        `Houve um erro interno ao salvar o produtor agricultor: ${error.message}`,
      );
    }
  }
}

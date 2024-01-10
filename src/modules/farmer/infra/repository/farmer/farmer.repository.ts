import { Farmer, Farmers, IFarmerRepository } from '@modules/farmer/domain';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { Result } from 'types-ddd';
import { AdapterFarmerDBOToDomain } from '../../adapters';
import { FarmerDBO } from './farmer.dbo';

export class FarmerRepository implements IFarmerRepository {
  constructor(private readonly orm: PrismaService) {}

  async getFarmById(id: string): Promise<Result<Farmer>> {
    try {
      const adapterFarmer = new AdapterFarmerDBOToDomain();

      const farmerDB = await this.orm.farmers.findUnique({
        where: { id },
      });

      if (!farmerDB) return Result.fail('Produtor não encontrado');

      const preparedFarmer = adapterFarmer.prepare(farmerDB);
      const buildedFarmer = adapterFarmer.build(preparedFarmer);

      return Result.Ok(buildedFarmer.value());
    } catch (error) {
      return Result.fail(
        `Houve um erro interno ao procurar o produtor: ${error.message}`,
      );
    }
  }

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

      const farmerDB = await this.orm.farmers.upsert({
        create: data,
        update: data,
        where: { id: data.id },
      });

      const preparedFarmer = adapterFarmer.prepare(farmerDB);
      const buildedFarmer = adapterFarmer.build(preparedFarmer);

      return Result.Ok(buildedFarmer.value());
    } catch (error) {
      return Result.fail(
        `Houve um erro interno ao salvar o produtor: ${error.message}`,
      );
    }
  }

  async getFarmers(): Promise<Result<Farmers>> {
    try {
      const adapterFarmer = new AdapterFarmerDBOToDomain();

      const farmersDB = await this.orm.farmers.findMany();

      const count = await this.orm.farmers.count();

      const preparedFarmers = farmersDB.map((farmer) =>
        adapterFarmer.prepare(farmer),
      );

      const buildedFarmers = preparedFarmers.map((farmer) =>
        adapterFarmer.build(farmer).value(),
      );

      return Result.Ok({
        farmers: buildedFarmers,
        metadata: {
          count,
        },
      });
    } catch (error) {
      return Result.fail(
        `Houve um erro interno ao listar produtores: ${error.message}`,
      );
    }
  }

  async deleteFarm(id: string): Promise<Result<string>> {
    try {
      const farmer = await this.orm.farmers.findUnique({
        where: { id },
      });

      if (!farmer) return Result.fail('Produtor não encontrado');

      await this.orm.farmers.delete({
        where: { id },
      });

      return Result.Ok('Produtor apagado com sucesso');
    } catch (error) {
      return Result.fail(
        `Houve um erro ao tentar deletar o produtor: ${error.message}`,
      );
    }
  }
}

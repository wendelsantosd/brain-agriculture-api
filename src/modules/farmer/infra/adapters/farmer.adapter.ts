import { Farmer } from '@modules/farmer/domain';
import { farmers } from '@prisma/client';
import { IAdapter, ID, Result } from 'types-ddd';
import { FarmerDBO } from '../repository';

export class AdapterFarmerDBOToDomain implements IAdapter<FarmerDBO, Farmer> {
  public build(target: FarmerDBO): Result<Farmer> {
    const farmer = Farmer.create({
      id: ID.create(target.id),
      name: target.name,
      farmName: target.farmName,
      cpfCnpj: target.cpfCnpj,
      city: target.city,
      state: target.state,
      totalArea: target.totalArea,
      agriculturalArea: target.agriculturalArea,
      vegetationArea: target.agriculturalArea,
      plantedCrops: target.plantedCrops,
    });

    if (farmer.isFail()) return Result.fail(farmer.error());

    return Result.Ok(farmer.value());
  }

  public prepare(farmerDB: farmers): FarmerDBO {
    return {
      id: farmerDB.id,
      name: farmerDB.name,
      cpfCnpj: farmerDB.cpfCnpj,
      farmName: farmerDB.farmName,
      city: farmerDB.city,
      state: farmerDB.state,
      totalArea: Number(farmerDB.totalArea),
      agriculturalArea: Number(farmerDB.agriculturalArea),
      vegetationArea: Number(farmerDB.vegetationArea),
      plantedCrops: farmerDB.plantedCrops,
    };
  }
}

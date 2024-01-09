import { Farmer } from '@modules/farmer/domain';
import { IAdapter, Result } from 'types-ddd';
import { FarmerDBO } from '../repository';

export class AdapterFarmerDBOToDomain implements IAdapter<FarmerDBO, Farmer> {
  build(target: FarmerDBO): Result<Farmer> {
    const farmer = Farmer.create({
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
}

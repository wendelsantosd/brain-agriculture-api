import { Farmer, IFarmerRepository } from '@modules/farmer/domain';
import { AdapterFarmerDBOToDomain } from '@modules/farmer/infra';
import { IUseCase, Result } from 'types-ddd';

type Request = {
  name: string;
  cpfCnpj: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;
  plantedCrops: string[];
};

type Response = Farmer;

export class CreateFarmerUseCase
  implements IUseCase<Request, Result<Response>>
{
  constructor(private readonly farmerRepository: IFarmerRepository) {}

  public async execute(data: Request): Promise<Result<Farmer>> {
    const toAdapt = new AdapterFarmerDBOToDomain().build(data);

    if (toAdapt.isFail()) return Result.fail(toAdapt.error());

    const farmer = await this.farmerRepository.save(toAdapt.value());

    if (farmer.isFail()) return Result.fail(farmer.error());

    return Result.Ok(farmer.value());
  }
}

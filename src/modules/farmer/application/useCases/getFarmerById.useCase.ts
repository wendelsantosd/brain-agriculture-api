import { Farmer, IFarmerRepository } from '@modules/farmer/domain';
import { IUseCase, Result } from 'types-ddd';

type Request = {
  id: string;
};

type Response = Farmer;

export class GetFarmerByIdUseCase
  implements IUseCase<Request, Result<Response>>
{
  constructor(private readonly farmerRepository: IFarmerRepository) {}

  public async execute({ id }: Request): Promise<Result<Farmer>> {
    const farmer = await this.farmerRepository.getFarmById(id);

    if (farmer.isFail()) return Result.fail(farmer.error());

    return Result.Ok(farmer.value());
  }
}

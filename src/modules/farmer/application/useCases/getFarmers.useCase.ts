import { Farmers, IFarmerRepository } from '@modules/farmer/domain';
import { IUseCase, Result } from 'types-ddd';

type Request = void;

type Response = Farmers;

export class GetFarmersUseCase implements IUseCase<Request, Result<Response>> {
  constructor(private readonly farmerRepository: IFarmerRepository) {}

  public async execute(): Promise<Result<Farmers>> {
    const farmers = await this.farmerRepository.getFarmers();

    if (farmers.isFail()) return Result.fail(farmers.error());

    return Result.Ok(farmers.value());
  }
}

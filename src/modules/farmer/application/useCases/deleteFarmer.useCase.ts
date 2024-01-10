import { IFarmerRepository } from '@modules/farmer/domain';
import { IUseCase, Result } from 'types-ddd';

type Request = {
  id: string;
};

type Response = string;

export class DeleteFarmerUseCase
  implements IUseCase<Request, Result<Response>>
{
  constructor(private readonly farmerRepository: IFarmerRepository) {}

  public async execute({ id }: Request): Promise<Result<string>> {
    const message = await this.farmerRepository.deleteFarm(id);

    if (message.isFail()) return Result.fail(message.error());

    return Result.Ok(message.value());
  }
}

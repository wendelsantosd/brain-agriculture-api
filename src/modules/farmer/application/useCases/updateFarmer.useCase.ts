import { Farmer, IFarmerRepository } from '@modules/farmer/domain';
import { UpdateFarmerDTO } from '@modules/farmer/infra/api';
import { IUseCase, Result } from 'types-ddd';

type Request = {
  data: UpdateFarmerDTO;
  id: string;
};

type Response = Farmer;

export class UpdateFarmerUseCase
  implements IUseCase<Request, Result<Response>>
{
  constructor(private readonly farmerRepository: IFarmerRepository) {}

  public async execute({ id, data }: Request): Promise<Result<Farmer>> {
    const farmer = await this.farmerRepository.getFarmById(id);

    if (farmer.isFail()) return Result.fail(farmer.error());

    const update = farmer.value().update({ ...data });

    if (update.isFail()) return Result.fail(update.error());

    const save = await this.farmerRepository.save(farmer.value());

    if (save.isFail()) return Result.fail(save.error());

    return Result.Ok(save.value());
  }
}

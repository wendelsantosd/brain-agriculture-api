import { Farmer } from '@modules/farmer';
import { makeCreateFarmer } from '@modules/farmer/application';
import { Injectable } from '@nestjs/common';
import { Result } from 'types-ddd';
import { CreateFarmerDTO } from './dtos';

@Injectable()
export class FarmerService {
  async create(data: CreateFarmerDTO): Promise<Result<Farmer>> {
    const farmer = await makeCreateFarmer().execute(data);

    if (farmer.isFail()) return Result.fail(farmer.error());

    return farmer;
  }
}

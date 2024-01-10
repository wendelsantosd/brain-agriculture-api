import { Farmer, Farmers } from '@modules/farmer';
import { makeCreateFarmer, makeGetFarmers } from '@modules/farmer/application';
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

  async findAll(): Promise<Result<Farmers>> {
    const farmers = await makeGetFarmers().execute();

    if (farmers.isFail()) return Result.fail(farmers.error());

    return farmers;
  }
}

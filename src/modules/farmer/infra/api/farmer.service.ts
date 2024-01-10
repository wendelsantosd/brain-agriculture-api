import { Farmer, Farmers } from '@modules/farmer';
import {
  CalculateResponse,
  makeCalculate,
  makeCreateFarmer,
  makeDeleteFarmer,
  makeGetFarmers,
  makeUpdateFarmer,
} from '@modules/farmer/application';
import { makeGetFarmerById } from '@modules/farmer/application/factories/makeGetFarmerById.factory';
import { Injectable } from '@nestjs/common';
import { Result } from 'types-ddd';
import { CreateFarmerDTO, UpdateFarmerDTO } from './dtos';

@Injectable()
export class FarmerService {
  async create(data: CreateFarmerDTO): Promise<Result<Farmer>> {
    const farmer = await makeCreateFarmer().execute(data);

    if (farmer.isFail()) return Result.fail(farmer.error());

    return farmer;
  }

  async update(data: UpdateFarmerDTO, id: string): Promise<Result<Farmer>> {
    const farmer = await makeUpdateFarmer().execute({ data, id });

    if (farmer.isFail()) return Result.fail(farmer.error());

    return farmer;
  }

  async findAll(): Promise<Result<Farmers>> {
    const farmers = await makeGetFarmers().execute();

    if (farmers.isFail()) return Result.fail(farmers.error());

    return farmers;
  }

  async findById(id: string): Promise<Result<Farmer>> {
    const farmer = await makeGetFarmerById().execute({ id });

    if (farmer.isFail()) return Result.fail(farmer.error());

    return farmer;
  }

  async delete(id: string): Promise<Result<string>> {
    const message = await makeDeleteFarmer().execute({ id });

    if (message.isFail()) return Result.fail(message.error());

    return message;
  }

  async calculate(): Promise<Result<CalculateResponse>> {
    const data = await makeCalculate().execute();

    if (data.isFail()) return Result.fail(data.error());

    return data;
  }
}

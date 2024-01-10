import { Farmer } from './farmer.aggregate';
import { Result } from 'types-ddd';

export type Farmers = {
  farmers: Farmer[];
  metadata: {
    count: number;
  };
};
export interface IFarmerRepository {
  save(farmer: Farmer): Promise<Result<Farmer>>;
  getFarmers(): Promise<Result<Farmers>>;
  getFarmById(id: string): Promise<Result<Farmer>>;
  deleteFarm(id: string): Promise<Result<string>>;
}

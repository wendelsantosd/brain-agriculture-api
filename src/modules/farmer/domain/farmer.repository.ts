import { Farmer } from './farmer.aggregate';
import { Result } from 'types-ddd';

export interface IFarmerRepository {
  save(farmer: Farmer): Promise<Result<Farmer>>;
}

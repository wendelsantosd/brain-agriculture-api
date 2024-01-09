import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export interface CreateFarmerDTO {
  name: string;
  cpfCnpj: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;
  plantedCrops: string[];
}

export class CreateFarmerDTOClass implements CreateFarmerDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cpfCnpj: string;

  @IsString()
  @IsNotEmpty()
  farmName: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNumber()
  totalArea: number;

  @IsString()
  @IsNumber()
  agriculturalArea: number;

  @IsString()
  @IsNumber()
  vegetationArea: number;

  plantedCrops: string[];
}

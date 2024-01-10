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

  @IsNumber()
  @IsNotEmpty()
  totalArea: number;

  @IsNumber()
  @IsNotEmpty()
  agriculturalArea: number;

  @IsNumber()
  @IsNotEmpty()
  vegetationArea: number;

  plantedCrops: string[];
}

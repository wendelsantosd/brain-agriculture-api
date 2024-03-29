import { Farmer, Farmers } from '@modules/farmer/domain';

type FarmerPresenterProps = {
  id: string;
  name: string;
  cpfCnpj: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;
  plantedCrops: string[];
  createdAt: Date;
  updatedAt: Date;
};

type FarmersPresenterProps = {
  farmers: FarmerPresenterProps[];
  metadata: {
    count: number;
  };
};

enum StateEnum {
  AC = 'Acre',
  AL = 'Alagoas',
  AP = 'Amapá',
  AM = 'Amazonas',
  BA = 'Bahia',
  CE = 'Ceará',
  DF = 'Distrito Federal',
  ES = 'Espírito Santo',
  GO = 'Goiás',
  MA = 'Maranhão',
  MT = 'Mato Grosso',
  MS = 'Mato Grosso do Sul',
  MG = 'Minas Gerais',
  PA = 'Pará',
  PB = 'Paraíba',
  PR = 'Paraná',
  PE = 'Pernambuco',
  PI = 'Piauí',
  RJ = 'Rio de Janeiro',
  RN = 'Rio Grande do Norte',
  RS = 'Rio Grande do Sul',
  RO = 'Rondônia',
  RR = 'Roraima',
  SC = 'Santa Catarina',
  SP = 'São Paulo',
  SE = 'Sergipe',
  TO = 'Tocantins',
}

export class FarmersPresenter {
  public toPresenter(data: Farmers): FarmersPresenterProps {
    const farmers: FarmerPresenterProps[] = data.farmers.map((farm) => {
      return {
        id: farm.id.value(),
        name: farm.name,
        cpfCnpj: farm.cpfCnpj,
        farmName: farm.farmName,
        city: farm.city,
        state: StateEnum[farm.state],
        totalArea: farm.totalArea,
        agriculturalArea: farm.agriculturalArea,
        vegetationArea: farm.vegetationArea,
        plantedCrops: farm.plantedCrops,
        createdAt: farm.createdAt,
        updatedAt: farm.updatedAt,
      };
    });

    return {
      farmers,
      metadata: { count: data.metadata.count },
    };
  }
}

export class FarmerPresenter {
  public toPresenter(data: Farmer): FarmerPresenterProps {
    return {
      id: data.id.value(),
      name: data.name,
      cpfCnpj: data.cpfCnpj,
      farmName: data.farmName,
      city: data.city,
      state: StateEnum[data.state],
      totalArea: data.totalArea,
      agriculturalArea: data.agriculturalArea,
      vegetationArea: data.vegetationArea,
      plantedCrops: data.plantedCrops,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}

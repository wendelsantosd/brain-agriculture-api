import { IFarmerRepository } from '@modules/farmer/domain';
import { IUseCase, Result } from 'types-ddd';
type Request = void;
type Response = CalculateResponse;

export type CalculateResponse = {
  totalFarms: number;
  totalArea: number;
  totalPerState: {
    AC: number;
    AL: number;
    AP: number;
    AM: number;
    BA: number;
    CE: number;
    DF: number;
    ES: number;
    GO: number;
    MA: number;
    MT: number;
    MS: number;
    MG: number;
    PA: number;
    PB: number;
    PR: number;
    PE: number;
    PI: number;
    RJ: number;
    RN: number;
    RS: number;
    RO: number;
    RR: number;
    SC: number;
    SP: number;
    SE: number;
    TO: number;
  };
  totalPerCulture: {
    soy: number;
    corn: number;
    cotton: number;
    coffee: number;
    sugarCane: number;
  };
  totalAreaAgriculturalAndVegetation: {
    agricultural: number;
    vegetation: number;
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

enum CropEnum {
  SOY = 'Soja',
  CORN = 'Milho',
  COTTON = 'Algodão',
  COFFEE = 'Café',
  SUGARCANE = 'Cana de Açucar',
}

export class CalculateUseCase implements IUseCase<Request, Result<Response>> {
  constructor(private readonly farmerRepository: IFarmerRepository) {}

  async execute(): Promise<Result<Response>> {
    const farmersAggregate = await this.farmerRepository.getFarmers();

    if (farmersAggregate.isFail()) return Result.fail(farmersAggregate.error());

    const farmers = farmersAggregate.value().farmers;

    const totalFarms = farmersAggregate.value().metadata.count;

    const totalArea = farmers.reduce((_, farmer) => farmer.totalArea, 0);

    const totalPerState = farmers.reduce(
      (acc, farmer) => {
        if (farmer.state === StateEnum.AC) acc.AC += 1;
        if (farmer.state === StateEnum.AL) acc.AL += 1;
        if (farmer.state === StateEnum.AP) acc.AP += 1;
        if (farmer.state === StateEnum.AM) acc.AM += 1;
        if (farmer.state === StateEnum.BA) acc.BA += 1;
        if (farmer.state === StateEnum.CE) acc.CE += 1;
        if (farmer.state === StateEnum.DF) acc.DF += 1;
        if (farmer.state === StateEnum.ES) acc.ES += 1;
        if (farmer.state === StateEnum.GO) acc.GO += 1;
        if (farmer.state === StateEnum.MA) acc.MA += 1;
        if (farmer.state === StateEnum.MT) acc.MT += 1;
        if (farmer.state === StateEnum.MS) acc.MS += 1;
        if (farmer.state === StateEnum.MG) acc.MG += 1;
        if (farmer.state === StateEnum.PA) acc.PA += 1;
        if (farmer.state === StateEnum.PB) acc.PB += 1;
        if (farmer.state === StateEnum.PR) acc.PR += 1;
        if (farmer.state === StateEnum.PE) acc.PE += 1;
        if (farmer.state === StateEnum.PI) acc.PI += 1;
        if (farmer.state === StateEnum.RJ) acc.RJ += 1;
        if (farmer.state === StateEnum.RN) acc.RN += 1;
        if (farmer.state === StateEnum.RS) acc.RS += 1;
        if (farmer.state === StateEnum.RO) acc.RO += 1;
        if (farmer.state === StateEnum.RR) acc.RR += 1;
        if (farmer.state === StateEnum.SC) acc.SC += 1;
        if (farmer.state === StateEnum.SP) acc.SP += 1;
        if (farmer.state === StateEnum.SE) acc.SE += 1;
        if (farmer.state === StateEnum.TO) acc.TO += 1;

        return acc;
      },
      {
        AC: 0,
        AL: 0,
        AP: 0,
        AM: 0,
        BA: 0,
        CE: 0,
        DF: 0,
        ES: 0,
        GO: 0,
        MA: 0,
        MT: 0,
        MS: 0,
        MG: 0,
        PA: 0,
        PB: 0,
        PR: 0,
        PE: 0,
        PI: 0,
        RJ: 0,
        RN: 0,
        RS: 0,
        RO: 0,
        RR: 0,
        SC: 0,
        SP: 0,
        SE: 0,
        TO: 0,
      },
    );

    const totalPerCulture = farmers.reduce(
      (acc, farmer) => {
        farmer.plantedCrops.forEach((crop) => {
          if (crop === CropEnum.SOY) acc.soy += 1;
          if (crop === CropEnum.CORN) acc.corn += 1;
          if (crop === CropEnum.COTTON) acc.cotton += 1;
          if (crop === CropEnum.COFFEE) acc.coffee += 1;
          if (crop === CropEnum.SUGARCANE) acc.sugarCane += 1;
        });

        return acc;
      },
      {
        soy: 0,
        corn: 0,
        cotton: 0,
        coffee: 0,
        sugarCane: 0,
      },
    );

    const totalAreaAgriculturalAndVegetation = farmers.reduce(
      (acc, farmer) => {
        if (farmer.agriculturalArea)
          acc.agricultural += farmer.agriculturalArea;

        if (farmer.vegetationArea) acc.vegetation += farmer.vegetationArea;

        return acc;
      },
      {
        agricultural: 0,
        vegetation: 0,
      },
    );

    return Result.Ok({
      totalFarms,
      totalArea,
      totalPerState,
      totalPerCulture,
      totalAreaAgriculturalAndVegetation,
    });
  }
}

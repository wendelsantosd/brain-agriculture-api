import { Farmers } from '@modules/farmer/domain';
import {
  AdapterFarmerDBOToDomain,
  FarmerRepository,
} from '@modules/farmer/infra';
import sinon from 'sinon';
import { Result } from 'types-ddd';
import { GetFarmersUseCase } from '../getFarmers.useCase';

type OutputProps = {
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
}[];

describe('Test Update Farmer', () => {
  let useCase: GetFarmersUseCase;
  let mockFarmers: Farmers;
  let mockFarmerRepository: sinon.SinonStubbedInstance<FarmerRepository>;
  let adapterFarmer: AdapterFarmerDBOToDomain;
  let output: OutputProps;

  beforeAll(() => {
    mockFarmerRepository = sinon.createStubInstance(FarmerRepository);
    adapterFarmer = new AdapterFarmerDBOToDomain();
  });

  beforeEach(() => {
    useCase = new GetFarmersUseCase(mockFarmerRepository);

    output = [
      {
        id: '332a4f08-fcc3-44d9-b2d1-b28b4b781f7d',
        name: 'Jonh Doe',
        cpfCnpj: '37385095003',
        farmName: 'Fazenda Doe',
        city: 'Belém',
        state: 'Pará',
        totalArea: 1000,
        agriculturalArea: 500,
        vegetationArea: 500,
        plantedCrops: ['Soja', 'Milho'],
      },
      {
        id: 'ce27747c-1e4f-418b-8ed3-e264af99f3b6',
        name: 'Jun Dae',
        cpfCnpj: '37385095009',
        farmName: 'Fazenda Dae',
        city: 'Belém',
        state: 'Pará',
        totalArea: 1000,
        agriculturalArea: 400,
        vegetationArea: 300,
        plantedCrops: ['Café', 'Algodão'],
      },
    ];

    const buildedFarmers = output.map((item) =>
      adapterFarmer.build(item).value(),
    );

    mockFarmers = {
      farmers: buildedFarmers,
      metadata: {
        count: buildedFarmers.length,
      },
    };
  });

  afterEach(() => {
    sinon.reset();
  });

  describe('Should be successful', () => {
    it('should be able to list farmers', async () => {
      mockFarmerRepository.getFarmers.resolves(Result.Ok(mockFarmers));

      const result = await useCase.execute();

      expect(result.isOk()).toBeTruthy();
      expect(mockFarmerRepository.getFarmers.calledOnce).toBeTruthy();
    });
  });

  describe('Should be fail', () => {
    it('should not be able to list farmers', async () => {
      mockFarmerRepository.getFarmers.resolves(
        Result.fail('Houve um erro interno ao listar os produtores'),
      );

      const result = await useCase.execute();

      expect(result.isFail()).toBeTruthy();
      expect(mockFarmerRepository.getFarmers.calledOnce).toBeTruthy();
    });
  });
});

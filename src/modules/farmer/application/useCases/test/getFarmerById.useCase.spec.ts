import { Farmer } from '@modules/farmer/domain';
import {
  AdapterFarmerDBOToDomain,
  FarmerRepository,
} from '@modules/farmer/infra';
import sinon from 'sinon';
import { Result } from 'types-ddd';
import { GetFarmerByIdUseCase } from '../getFarmerById.useCase';

type InputProps = {
  id: string;
};

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
};

describe('Test Get a Farmer', () => {
  let useCase: GetFarmerByIdUseCase;
  let mockFarmer: Farmer;
  let mockFarmerRepository: sinon.SinonStubbedInstance<FarmerRepository>;
  let adapterFarmer: AdapterFarmerDBOToDomain;
  let input: InputProps;
  let output: OutputProps;

  beforeAll(() => {
    mockFarmerRepository = sinon.createStubInstance(FarmerRepository);
    adapterFarmer = new AdapterFarmerDBOToDomain();
  });

  beforeEach(() => {
    useCase = new GetFarmerByIdUseCase(mockFarmerRepository);

    input = {
      id: '332a4f08-fcc3-44d9-b2d1-b28b4b781f7d',
    };

    output = {
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
    };

    mockFarmer = adapterFarmer.build(output).value();
  });

  afterEach(() => {
    sinon.reset();
  });

  describe('Should be successful', () => {
    it('should be able to get a farmer', async () => {
      mockFarmerRepository.getFarmById.resolves(Result.Ok(mockFarmer));

      const result = await useCase.execute({ id: input.id });

      expect(result.isOk()).toBeTruthy();
      expect(mockFarmerRepository.getFarmById.calledOnce).toBeTruthy();
    });
  });

  describe('Should be fail', () => {
    it('should not be able to get a farmer', async () => {
      mockFarmerRepository.getFarmById.resolves(
        Result.fail('Produtor não encontrado'),
      );

      const result = await useCase.execute({ id: input.id });

      expect(result.isFail()).toBeTruthy();
      expect(mockFarmerRepository.getFarmById.calledOnce).toBeTruthy();
    });
  });
});

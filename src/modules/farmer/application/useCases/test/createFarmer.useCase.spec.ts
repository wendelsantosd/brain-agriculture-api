import { Farmer } from '@modules/farmer/domain';
import {
  AdapterFarmerDBOToDomain,
  FarmerRepository,
} from '@modules/farmer/infra';
import sinon from 'sinon';
import { Result } from 'types-ddd';
import { CreateFarmerUseCase } from '../createFarmer.useCase';

type InputProps = {
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

describe('Test Create Farmer', () => {
  let useCase: CreateFarmerUseCase;
  let mockFarmer: Farmer;
  let mockFarmerRepository: sinon.SinonStubbedInstance<FarmerRepository>;
  let adapterFarmer: AdapterFarmerDBOToDomain;
  let input: InputProps;

  beforeAll(() => {
    mockFarmerRepository = sinon.createStubInstance(FarmerRepository);
    adapterFarmer = new AdapterFarmerDBOToDomain();
  });

  beforeEach(() => {
    useCase = new CreateFarmerUseCase(mockFarmerRepository);

    input = {
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

    mockFarmer = adapterFarmer.build(input).value();
  });

  afterEach(() => {
    sinon.reset();
  });

  describe('Should be successful', () => {
    it('should be able to create a farmer', async () => {
      mockFarmerRepository.save.resolves(Result.Ok(mockFarmer));

      const result = await useCase.execute(input);

      expect(result.isOk()).toBeTruthy();
      expect(mockFarmerRepository.save.calledOnce).toBeTruthy();
    });
  });

  describe('Should be fail', () => {
    it('should not be able to create a farmer', async () => {
      mockFarmerRepository.save.resolves(
        Result.fail('Houve um erro ao criar um produtor'),
      );

      const result = await useCase.execute(input);

      expect(result.isFail()).toBeTruthy();
      expect(mockFarmerRepository.save.calledOnce).toBeTruthy();
    });
  });
});

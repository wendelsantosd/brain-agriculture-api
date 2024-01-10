import { FarmerRepository } from '@modules/farmer/infra';
import sinon from 'sinon';
import { Result } from 'types-ddd';
import { DeleteFarmerUseCase } from '../deleteFarmer.useCase';

type InputProps = {
  id: string;
};

describe('Test Get a Farmer', () => {
  let useCase: DeleteFarmerUseCase;
  let mockFarmerRepository: sinon.SinonStubbedInstance<FarmerRepository>;
  let input: InputProps;

  beforeAll(() => {
    mockFarmerRepository = sinon.createStubInstance(FarmerRepository);
  });

  beforeEach(() => {
    useCase = new DeleteFarmerUseCase(mockFarmerRepository);

    input = {
      id: '332a4f08-fcc3-44d9-b2d1-b28b4b781f7d',
    };
  });

  afterEach(() => {
    sinon.reset();
  });

  describe('Should be successful', () => {
    it('should be able to delete a farmer', async () => {
      mockFarmerRepository.deleteFarm.resolves(
        Result.Ok('Produtor apagado com sucesso'),
      );

      const result = await useCase.execute({ id: input.id });

      expect(result.isOk()).toBeTruthy();
      expect(mockFarmerRepository.deleteFarm.calledOnce).toBeTruthy();
    });
  });

  describe('Should be fail', () => {
    it('should not be able to delete a farmer', async () => {
      mockFarmerRepository.deleteFarm.resolves(
        Result.fail('Produtor não encontrado'),
      );

      const result = await useCase.execute({ id: input.id });

      expect(result.isFail()).toBeTruthy();
      expect(mockFarmerRepository.deleteFarm.calledOnce).toBeTruthy();
    });
  });
});

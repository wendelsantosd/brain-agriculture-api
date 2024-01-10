import { Aggregate, Result, UID } from 'types-ddd';

export type FarmerProps = {
  id?: UID;
  name: string;
  cpfCnpj: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;
  plantedCrops: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class Farmer extends Aggregate<FarmerProps> {
  private constructor(props: FarmerProps) {
    super(props);
  }

  get cpfCnpj(): string {
    return this.props.cpfCnpj;
  }

  get name(): string {
    return this.props.name;
  }

  get farmName(): string {
    return this.props.farmName;
  }

  get city(): string {
    return this.props.city;
  }

  get state(): string {
    return this.props.state;
  }

  get totalArea(): number {
    return this.props.totalArea;
  }

  get agriculturalArea(): number {
    return this.props.agriculturalArea;
  }

  get vegetationArea(): number {
    return this.props.vegetationArea;
  }

  get plantedCrops(): string[] {
    return this.props.plantedCrops;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private static isValid({
    cpfCnpj,
    name,
    farmName,
    city,
    state,
    totalArea,
    agriculturalArea,
    vegetationArea,
  }: FarmerProps) {
    const { string } = this.validator;
    if (
      string(cpfCnpj).hasLengthEqualTo(11) ||
      string(cpfCnpj).hasLengthEqualTo(14)
    ) {
    } else {
      return Result.fail('O CPF ou CNPJ está incorreto');
    }

    if (string(name).isEmpty())
      return Result.fail('O nome do produtor não pode ser vazio');

    if (string(farmName).isEmpty())
      return Result.fail('O nome da fazenda não pode ser vazio');

    if (string(city).isEmpty())
      return Result.fail('A cidade não pode ser vazia');

    if (string(state).isEmpty())
      return Result.fail('O estado não pode ser vazia');

    if (!totalArea)
      return Result.fail('O valor total da área não pode ser vazio');

    if (agriculturalArea > totalArea)
      return Result.fail(
        'A área agricultável não pode ser maior que a área total',
      );

    if (vegetationArea > totalArea)
      return Result.fail(
        'A área de vegetação não pode ser maior que a área total',
      );

    if (agriculturalArea + vegetationArea > totalArea)
      return Result.fail(
        'A soma das áreas não pode ser maior que a área total',
      );

    return Result.Ok();
  }

  public static create(props: FarmerProps): Result<Farmer> {
    const isValid = Farmer.isValid(props);

    if (isValid.isFail()) return Result.fail(isValid.error());

    return Result.Ok(new Farmer(props));
  }
}

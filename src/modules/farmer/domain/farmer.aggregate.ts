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
  plantedCrops?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export enum StateEnum {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MS = 'MS',
  MG = 'MG',
  PA = 'PA',
  PB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO',
}

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
    plantedCrops,
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

    if (!StateEnum[state]) {
      return Result.fail('O estado informado é inválido');
    }

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

    const permittedCrops = [
      'Soja',
      'Milho',
      'Algodão',
      'Café',
      'Cana de Açucar',
    ];

    const hasInvalidCrop =
      plantedCrops &&
      plantedCrops.some((crop) => !permittedCrops.includes(crop));

    if (hasInvalidCrop)
      return Result.fail(
        'Somente são aceitas as seguintes culturas: Soja, Milho, Algodão, Café, Cana de Açucar',
      );

    return Result.Ok();
  }

  public static create(props: FarmerProps): Result<Farmer> {
    const isValid = Farmer.isValid(props);

    if (isValid.isFail()) return Result.fail(isValid.error());

    return Result.Ok(new Farmer(props));
  }

  public update(props: Partial<FarmerProps>): Result<void> {
    const isValid = Farmer.isValid({
      cpfCnpj: props.cpfCnpj ?? this.cpfCnpj,
      name: props.name ?? this.name,
      farmName: props.farmName ?? this.farmName,
      city: props.city ?? this.city,
      state: props.state ?? this.state,
      totalArea: props.totalArea ?? this.totalArea,
      agriculturalArea: props.agriculturalArea ?? this.agriculturalArea,
      vegetationArea: props.vegetationArea ?? this.vegetationArea,
    });

    if (isValid.isFail()) return Result.fail(isValid.error());

    if (props.cpfCnpj) this.change('cpfCnpj', props.cpfCnpj);
    if (props.name) this.change('name', props.name);
    if (props.farmName) this.change('farmName', props.farmName);
    if (props.city) this.change('city', props.city);
    if (props.state) this.change('state', props.state);
    if (props.totalArea) this.change('totalArea', props.totalArea);
    if (props.agriculturalArea)
      this.change('agriculturalArea', props.agriculturalArea);
    if (props.vegetationArea)
      this.change('vegetationArea', props.vegetationArea);
    if (props.plantedCrops) this.change('plantedCrops', props.plantedCrops);

    return Result.Ok();
  }
}

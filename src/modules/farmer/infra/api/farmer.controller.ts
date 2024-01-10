import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateFarmerDTOClass, UpdateFarmerDTOClass } from './dtos';
import { FarmerService } from './farmer.service';
import { Response } from 'express';
import { FarmerPresenter, FarmersPresenter } from '@modules/farmer';

@Controller('farmer')
export class farmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @Get('/calculate')
  async dashboard(@Res() response: Response) {
    const result = await this.farmerService.calculate();

    if (result.isFail())
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: result.error(),
      });

    return response.status(HttpStatus.OK).json(result.value());
  }

  @Get()
  async getFarmers(@Res() response: Response) {
    const result = await this.farmerService.findAll();

    if (result.isFail())
      return response.status(HttpStatus.NOT_FOUND).json({
        message: result.error(),
      });

    return response
      .status(HttpStatus.OK)
      .json(new FarmersPresenter().toPresenter(result.value()));
  }

  @Get('/:id')
  async getFarmerById(@Param('id') id: string, @Res() response: Response) {
    const result = await this.farmerService.findById(id);

    if (result.isFail())
      return response.status(HttpStatus.NOT_FOUND).json({
        message: result.error(),
      });

    return response
      .status(HttpStatus.OK)
      .json(new FarmerPresenter().toPresenter(result.value()));
  }

  @Post()
  async createFarmer(
    @Body() data: CreateFarmerDTOClass,
    @Res() response: Response,
  ) {
    const result = await this.farmerService.create(data);

    if (result.isFail())
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: result.error(),
      });

    return response.status(HttpStatus.OK).json({
      message: 'Produtor rural criado com sucesso',
    });
  }

  @Put('/:id')
  async updateFarmer(
    @Param('id') id: string,
    @Body() data: UpdateFarmerDTOClass,
    @Res() response: Response,
  ) {
    const result = await this.farmerService.update(data, id);

    if (result.isFail())
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: result.error(),
      });

    return response.status(HttpStatus.OK).json({
      message: 'Produtor rural alterado com sucesso',
    });
  }

  @Delete('/:id')
  async deleteFarmer(@Param('id') id: string, @Res() response: Response) {
    const result = await this.farmerService.delete(id);

    if (result.isFail())
      return response.status(HttpStatus.NOT_FOUND).json({
        message: result.error(),
      });

    return response.status(HttpStatus.OK).json({ message: result.value() });
  }
}

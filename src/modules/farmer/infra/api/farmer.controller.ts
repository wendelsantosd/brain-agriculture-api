import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateFarmerDTOClass } from './dtos';
import { FarmerService } from './farmer.service';
import { Response } from 'express';

@Controller('farmer')
export class farmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @Post()
  async farmerCreate(
    @Body() data: CreateFarmerDTOClass,
    @Res() response: Response,
  ) {
    const result = await this.farmerService.create(data);

    if (result.isFail())
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: result.error(),
      });

    return response.status(HttpStatus.OK).json({
      message: 'Produtor rural criado com sucesso!',
    });
  }
}

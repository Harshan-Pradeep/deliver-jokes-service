import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateTypeDto } from './dto/create-type.dto';

@Controller('api/v1/delivery')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) { }

    @Get('random')
    async findRandom() {
        return this.deliveryService.findRandomJoke();
    }
    @Get('types')
    async findAllTypes() {
        return this.deliveryService.findAllTypes();

    }

    @Post('types')
    async createJokeType(@Body() createTypeDto: CreateTypeDto) {
        return this.deliveryService.createJokeType(createTypeDto);

    }
}

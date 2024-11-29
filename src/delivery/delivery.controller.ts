import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

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
}

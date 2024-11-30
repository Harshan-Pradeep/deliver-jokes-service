import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { CreateJokeDto } from './dto/create-joke.dto';
import { Response } from 'express';

@Controller('api/v1/delivery')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) { }

    @Get('random')
    async findRandom(@Res() res: Response) {
        const joke = await this.deliveryService.findRandomJoke();
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: 'Random joke retrieved successfully',
            data: joke,
        });
    }

    @Get('types')
    async findAllTypes(@Res() res: Response) {
        const types = await this.deliveryService.findAllTypes();
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: 'List of joke types retrieved successfully',
            data: types,
        });
    }

    @Post('types')
    async createJokeType(@Body() createTypeDto: CreateTypeDto, @Res() res: Response) {
        const type = await this.deliveryService.createJokeType(createTypeDto);
        return res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            message: 'Joke type created successfully',
            data: type,
        });
    }

    @Post('submit')
    async createJoke(@Body() createJokeDto: CreateJokeDto, @Res() res: Response) {
        const joke = await this.deliveryService.createJoke(createJokeDto);
        return res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            message: 'Joke created successfully',
            data: joke,
        });
    }
}

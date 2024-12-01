import { Body, Controller, Get, HttpStatus, Post, Res, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { CreateJokeDto } from './dto/create-joke.dto';
import { Response } from 'express';

@Controller('api/v1/delivery')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) { }

    @Get('random')
    async findRandom(@Res() res: Response) {
        try {
            const joke = await this.deliveryService.findRandomJoke();
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Random joke retrieved successfully',
                data: joke,
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: error.message,
                });
            }
            throw new InternalServerErrorException('Error retrieving random joke');
        }
    }

    @Get('types')
    async findAllTypes(@Res() res: Response) {
        try {
            const types = await this.deliveryService.findAllTypes();
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,                                                                                                                                                                                                                                                     
                message: 'List of joke types retrieved successfully',
                data: types,
            });
        } catch (error) {
            if (error.status === HttpStatus.NOT_FOUND) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: error.message,
                });
            }
            throw new InternalServerErrorException('Error retrieving joke types');
        }
    }

    @Post('types')
    async createJokeType(@Body() createTypeDto: CreateTypeDto, @Res() res: Response) {
        try {
            const type = await this.deliveryService.createJokeType(createTypeDto);
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: 'Joke type created successfully',
                data: type,
            });
        } catch (error) {
            if (error.status === HttpStatus.BAD_REQUEST) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: error.message,
                });
            }
            throw new InternalServerErrorException('Error creating joke type');
        }
    }

    @Post('submit')
    async createJoke(@Body() createJokeDto: CreateJokeDto, @Res() res: Response) {
        try {
            const joke = await this.deliveryService.createJoke(createJokeDto);
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: 'Joke created successfully',
                data: joke,
            });
        } catch (error) {
            throw new InternalServerErrorException('Error creating joke');
        }
    }
}
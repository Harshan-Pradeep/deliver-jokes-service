import { Body, Controller, Get, HttpStatus, Post, Res, InternalServerErrorException, NotFoundException, Query } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { CreateJokeDto } from './dto/create-joke.dto';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Delivery APIs')
@Controller('api/v1/delivery')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) { }

    @Get('random')
    @ApiOperation({ summary: 'Retrieve a random joke' })
    @ApiQuery({
        name: 'type',
        required: false,
        description: 'Type of joke to retrieve',
    })
    @ApiResponse({
        status: 200,
        description: 'Random joke retrieved successfully.',
        content: {
            'application/json': {
                example: {
                    statusCode: 200,
                    message: "Random joke retrieved successfully",
                    data: {
                        "id": 1,
                        "content": "sample joke",
                        "type": "sample type",
                        "status": "approved",
                        "author": "John Doe",
                        "createdAt": "2024-12-01T05:36:01.000Z"
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'Unable to find a joke or joke type',
        content: {
            'application/json': {
                examples: {
                    jokeNotFound: {
                        summary: 'No joke found',
                        value: {
                            statusCode: 404,
                            message: "No joke found"
                        }
                    },
                    typeNotFound: {
                        summary: 'Joke type not found',
                        value: {
                            statusCode: 404,
                            message: "Joke type 'sample type' not found"
                        }
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Error retrieving random joke'
    })
    async findRandom(
        @Res() res: Response,
        @Query('type') type?: string
    ) {
        try {
            const joke = await this.deliveryService.findRandomJoke(type);
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
    @ApiOperation({ summary: 'Retrieve all joke types' })
    @ApiResponse({
        status: 200,
        description: 'List of joke types retrieved successfully',
        content: {
            'application/json': {
                example: {
                    statusCode: 200,
                    message: "List of joke types retrieved successfully",
                    "data": [
                        {
                            "id": 1,
                            "name": "sample type1"
                        },
                        {
                            "id": 2,
                            "name": "sample type2"
                        }
                    ]
                }
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'Joke types not found.',
        content: {
            'application/json': {
                example: {
                    statusCode: 404,
                    message: "No joke types found"
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Error retrieving joke types'
    })
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
    @ApiOperation({ summary: 'Create a new joke type' })
    @ApiBody({ type: CreateTypeDto })
    @ApiResponse({
        status: 201,
        description: 'Joke type created successfully',
        content: {
            'application/json': {
                example: {
                    "statusCode": 201,
                    message: "Joke type created successfully",
                    data: {
                        "name": "sample type",
                        "id": 1
                    }
                }
            }
        }

    })
    @ApiResponse({
        status: 400,
        description: 'Bad request.',
        content: {
            'application/json': {
                example: {
                    statusCode: 400,
                    message: [
                        "Name must be at least 3 characters long",
                        "Name cannot be empty",
                        "Name must be a string"
                    ],
                    errors: "Bad Request"
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Error creating joke type'
    })
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
    @ApiOperation({ summary: 'Submit a new joke' })
    @ApiBody({ type: CreateJokeDto })
    @ApiResponse({
        status: 201,
        description: 'Joke created successfully',
        content: {
            'application/json': {
                example: {
                    statusCode: 201,
                    message: "Joke created successfully",
                    data: {
                        "content": "Why did the chicken cross the road? To get to the other side!",
                        "type": "sample type",
                        "status": "approved",
                        "id": 6,
                        "createdAt": "2024-12-01T05:49:14.000Z"
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'The request could not be processed due to validation errors.',
        schema: {
            example: {
                statusCode: 404,
                message: [
                    "Content must be at least 20 characters long",
                    "Content cannot be empty",
                    "Content must be a string",
                    "Joke type should be selected from the dropdown",
                    "Status must be a valid JokeStatus"
                ],
                errors: "Validation failed"
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Error creating joke'
    })
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
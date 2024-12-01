import { Injectable, NotFoundException, BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { IJokeRepository } from './repositories/joke.repository.interface';
import { ITypeRepository } from './repositories/type.repository.interface';
import { CreateTypeDto } from './dto/create-type.dto';
import { CreateJokeDto } from './dto/create-joke.dto';
import { Joke } from './entities/delivery.entity';
import { Type } from './entities/type.entity';

@Injectable()
export class DeliveryService {
    constructor(
        @Inject('IJokeRepository')
        private readonly jokeRepository: IJokeRepository,
        @Inject('ITypeRepository')
        private readonly typeRepository: ITypeRepository,
    ) { }

    async findAllTypes(): Promise<Type[]> {
        try {
            const types = await this.typeRepository.findAll();
            if (types.length === 0) {
                throw new NotFoundException('No joke types found');
            }
            return types;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error retrieving joke types');
        }
    }

    async findRandomJoke(): Promise<Joke> {
        try {
            const randomJoke = await this.jokeRepository.findRandomApprovedJoke();

            if (!randomJoke) {
                throw new NotFoundException('No joke found');
            }
            return randomJoke;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error retrieving random joke');
        }
    }

    async createJokeType(createTypeDto: CreateTypeDto): Promise<Type> {
        try {
            const existingType = await this.typeRepository.findByName(createTypeDto.name);
            if (existingType) {
                throw new BadRequestException('Joke type already exists');
            }
            return await this.typeRepository.create(createTypeDto);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Error creating joke type');
        }
    }

    async createJoke(createJokeDto: CreateJokeDto): Promise<Joke> {
        try {
            return await this.jokeRepository.create(createJokeDto);
        } catch (error) {
            throw new InternalServerErrorException('Error creating joke');
        }
    }
}
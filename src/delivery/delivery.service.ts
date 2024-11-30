import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
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
        const types = await this.typeRepository.findAll();
        if (types.length === 0) {
            throw new NotFoundException('No joke types found');
        }
        return types;
    }

    async findRandomJoke(): Promise<Joke> {
        return await this.jokeRepository.findRandomApprovedJoke();
    }

    async createJokeType(createTypeDto: CreateTypeDto): Promise<Type> {
        const existingType = await this.typeRepository.findByName(createTypeDto.name);
        if (existingType) {
            throw new BadRequestException('Joke type already exists');
        }
        return await this.typeRepository.create(createTypeDto);
    }

    async createJoke(createJokeDto: CreateJokeDto): Promise<Joke> {
        return await this.jokeRepository.create(createJokeDto);
    }
}

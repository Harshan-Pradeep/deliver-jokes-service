import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Joke } from './entities/delivery.entity';
import { Repository } from 'typeorm';
import { Type } from './entities/type.entity';
import { CreateTypeDto } from './dto/create-type.dto';
import { CreateJokeDto } from './dto/create-joke.dto';
import { JokeStatus } from './enums/joke-status.enum';

@Injectable()
export class DeliveryService {
    constructor(
        @InjectRepository(Joke)
        private jokeRepository: Repository<Joke>,
        @InjectRepository(Type)
        private typeRepository: Repository<Type>,
    ) { }

    async findAllTypes(): Promise<Type[]> {
        const types = await this.typeRepository.find();
        if (types.length === 0) {
            throw new NotFoundException('No joke types found');
        }
        return types;
    }

    async findRandomJoke(): Promise<Joke> {
        const jokes = await this.jokeRepository.find({ where: { status: JokeStatus.APPROVED } });
        if (jokes.length === 0) {
            throw new NotFoundException('No approved jokes found');
        }
        const randomIndex = Math.floor(Math.random() * jokes.length);
        return jokes[randomIndex];
    }

    async createJokeType(createTypeDto: CreateTypeDto): Promise<Type> {
        const existingType = await this.typeRepository.findOne({ where: { name: createTypeDto.name } });
        if (existingType) {
            throw new BadRequestException('Joke type already exists');
        }
        const newJokeType = this.typeRepository.create(createTypeDto);
        return await this.typeRepository.save(newJokeType);
    }

    async createJoke(createJokeDto: CreateJokeDto): Promise<Joke> {
        const newJoke = this.jokeRepository.create(createJokeDto);
        return await this.jokeRepository.save(newJoke);
    }
}

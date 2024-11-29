import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Joke } from './entities/delivery.entity';
import { Repository } from 'typeorm';
import { Type } from './entities/type.entity';

@Injectable()
export class DeliveryService {
    constructor(
        @InjectRepository(Joke)
        private jokeRepository: Repository<Joke>,
        @InjectRepository(Type)
        private typeRepository: Repository<Type>,
    ) { }

    async findAllTypes(): Promise<Type[]> {
        return this.typeRepository.find();
    }

    async findRandomJoke(): Promise<Joke> {
        const jokes = await this.jokeRepository.find({ where: { status: 'approved' } });
        if (jokes.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * jokes.length);
        return jokes[randomIndex];
    }
}

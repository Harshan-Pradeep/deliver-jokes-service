import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Joke } from '../entities/delivery.entity';
import { JokeStatus } from '../enums/joke-status.enum';
import { IJokeRepository } from './joke.repository.interface';
import { CreateJokeDto } from '../dto/create-joke.dto';

@Injectable()
export class JokeRepository implements IJokeRepository {
    constructor(
        @InjectRepository(Joke)
        private readonly jokeRepository: Repository<Joke>,
    ) { }

    async findRandomApprovedJoke(type?: string): Promise<Joke> {
        const queryBuilder = this.jokeRepository.createQueryBuilder('joke')
            .where('joke.status = :status', { status: JokeStatus.APPROVED });

        if (type) {
            queryBuilder.andWhere('joke.type = :type', { type });
        }

        const jokes = await queryBuilder.getMany();

        if (jokes.length === 0) {
            return null;
        }

        const randomIndex = Math.floor(Math.random() * jokes.length);
        return jokes[randomIndex];
    }

    async create(createJokeDto: CreateJokeDto): Promise<Joke> {
        const newJoke = this.jokeRepository.create(createJokeDto);
        return await this.jokeRepository.save(newJoke);
    }
}

import { CreateJokeDto } from "../dto/create-joke.dto";
import { Joke } from "../entities/delivery.entity";

export interface IJokeRepository {
    findRandomApprovedJoke(type?: string): Promise<Joke>;
    create(createJokeDto: CreateJokeDto): Promise<Joke>;
}

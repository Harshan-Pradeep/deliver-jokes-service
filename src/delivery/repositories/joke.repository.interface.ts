import { CreateJokeDto } from "../dto/create-joke.dto";
import { Joke } from "../entities/delivery.entity";

export interface IJokeRepository {
    findRandomApprovedJoke(): Promise<Joke>;
    create(createJokeDto: CreateJokeDto): Promise<Joke>;
}

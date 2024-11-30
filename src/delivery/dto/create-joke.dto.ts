import { IsString, MinLength, IsIn, IsOptional, IsNotEmpty } from "class-validator";
import { JokeStatus } from "../enums/joke-status.enum";

export class CreateJokeDto {
    @IsString({ message: "Content must be a string" })
    @IsNotEmpty({ message: "Content cannot be empty" })
    @MinLength(20, { message: "Content must be at least 20 characters long" })
    content: string;

    @IsString({ message: "Joke type should be selected from the dropdown" })
    type: string;

    @IsIn(Object.values(JokeStatus), { message: "Status must be a valid JokeStatus" })
    status?: JokeStatus;

    @IsOptional()
    @IsString({ message: "Author must be a string" })
    author?: string;
}
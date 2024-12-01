import { IsString, MinLength, IsIn, IsOptional, IsNotEmpty } from "class-validator";
import { JokeStatus } from "../enums/joke-status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateJokeDto {
    @ApiProperty({ description: 'The content of the joke', example: 'Why did the chicken cross the road? To get to the other side!' })
    @IsString({ message: "Content must be a string" })
    @IsNotEmpty({ message: "Content cannot be empty" })
    @MinLength(20, { message: "Content must be at least 20 characters long" })
    content: string;

    @ApiProperty({ description: 'The type of the joke', example: 'Knock-Knock' })
    @IsString({ message: "Joke type should be selected from the dropdown" })
    type: string;

    @ApiProperty({ description: 'The status of the joke', example: 'pending', enum: JokeStatus, required: true })
    @IsIn(Object.values(JokeStatus), { message: "Status must be a valid JokeStatus" })
    status: JokeStatus;

    @ApiProperty({ description: 'The author of the joke', example: 'John Doe', required: false })
    @IsOptional()
    @IsString({ message: "Author must be a string" })
    author?: string;
}
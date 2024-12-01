import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsNotEmpty } from "class-validator";

export class CreateTypeDto {
    @ApiProperty({ description: 'The name of the joke type', example: 'Knock-Knock' })
    @IsString({ message: "Name must be a string" })
    @IsNotEmpty({ message: "Name cannot be empty" })
    @MinLength(3, { message: "Name must be at least 3 characters long" })
    name: string;
}

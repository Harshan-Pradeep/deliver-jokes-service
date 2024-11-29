import { IsString, MinLength } from "class-validator";

export class CreateTypeDto {
    @IsString()
    name: string;
}
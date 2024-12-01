import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, MinLength, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { JokeStatus } from '../enums/joke-status.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Joke {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the joke type', example: 'Knock-Knock' })
  @Column()
  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content cannot be empty' })
  @MinLength(5, { message: 'Content must be at least 5 characters long' })
  content: string;

  @Column()
  @IsString({ message:  "Joke type should be selected from the dropdown" })
  type: string;

  @Column()
  @IsString({ message: 'Status must be a valid string' })
  @IsIn(Object.values(JokeStatus), { message: 'Status must be a valid JokeStatus' })
  status: JokeStatus;

  @Column()
  @IsString({ message: 'Author must be a string' })
  @IsOptional()
  author?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

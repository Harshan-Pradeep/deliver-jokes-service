import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Joke {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

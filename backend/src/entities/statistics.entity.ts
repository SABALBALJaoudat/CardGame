import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Statistics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gamesPlayed: number;

  @Column()
  gamesWon: number;

  @Column()
  averageGameTime: number;

  @ManyToOne(() => User, (user) => user.statistics)
  user: User;
}

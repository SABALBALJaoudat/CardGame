import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Deck } from './deck.entity';
import { Statistics } from './statistics.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Deck, (deck) => deck.user)
  decks: Deck[];

  @OneToMany(() => Statistics, (statistics) => statistics.user)
  statistics: Statistics[];
}

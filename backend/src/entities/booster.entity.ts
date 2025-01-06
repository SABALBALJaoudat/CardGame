import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class Booster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Card)
  cards: Card[];
}

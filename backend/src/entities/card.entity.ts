import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Family } from './family.entity';
import { Deck } from './deck.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  attack: number;

  @Column()
  energy: number;

  @Column()
  hp: number;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Family, (family) => family.cards)
  family: Family;

  @OneToMany(() => Deck, (deck) => deck.cards)
  decks: Deck[];
}

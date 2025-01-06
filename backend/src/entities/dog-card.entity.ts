import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DogCard {
  @PrimaryGeneratedColumn()
  cardId: number;

  @Column()
  title: string;

  @Column()
  attack: number;

  @Column()
  energie: number;

  @Column()
  family: string;

  @Column()
  pv: number;
}
import { Seeder } from 'nestjs-seeder';
import { Connection } from 'typeorm';
import { User } from './entities/user.entity';
import { Card } from './entities/card.entity';
import { Family } from './entities/family.entity';

export class DatabaseSeeder implements Seeder {
  constructor(private dataSource: Connection) {}

  async seed(): Promise<any> {
    const cardRepository = this.dataSource.getRepository(Card);
    const familyRepository = this.dataSource.getRepository(Family);

    const family1 = await familyRepository.save({ name: 'Explorateur' });
    const card1 = await cardRepository.save({ name: 'Loulou - Cavalier King Charles', attack: 10, energy: 2, hp: 15, family: family1 });

  }

  async drop(): Promise<any> {
    const cardRepository = this.dataSource.getRepository(Card);
    const familyRepository = this.dataSource.getRepository(Family);

    await cardRepository.delete({});
    await familyRepository.delete({});
  }
}

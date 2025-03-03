import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Statistics } from './entities/statistics.entity';
import { Card } from './entities/card.entity';
import { Family } from './entities/family.entity';
import { Deck } from './entities/deck.entity';
import { Booster } from './entities/booster.entity';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   url: process.env.DATABASE_URL,
    //   autoLoadEntities: true,
    //   synchronize: true, // Désactivez en production !
    //   extra: {
    //     ssl: {
    //       rejectUnauthorized: false, // Désactive la vérification du certificat pour Render
    //     },
    //   },
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'cardgame_goodboybattle',
      autoLoadEntities: true,
      synchronize: false, // Attention : à utiliser uniquement en développement
    }),
    TypeOrmModule.forFeature([User, Statistics, Card, Family, Deck, Booster]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

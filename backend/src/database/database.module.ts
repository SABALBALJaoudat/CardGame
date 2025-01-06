import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Charge les variables d'environnement
    TypeOrmModule.forRootAsync({
        useFactory: (configService: ConfigService) => {
          console.log('Connecting to database...');
          console.log('Database URL:', configService.get<string>('DATABASE_URL'));
          console.log('DATABASE_URL:', process.env.DATABASE_URL);
          return {
            type: 'postgres',
            url: configService.get<string>('DATABASE_URL'),
            autoLoadEntities: true,
            synchronize: true,
            extra: {
              ssl: {
                rejectUnauthorized: false,
              },
            },
          };
        },
        inject: [ConfigService],
      }),
  ],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Restaurant } from './model/restaurant.model';
import * as dotenv from 'dotenv';
import * as process from 'node:process';
import { Tables } from './model/tables.model';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      port: 5432,
      host: process.env.DB_HOST,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // models: [Restaurant, Tables],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Restaurant, Tables]),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';
import * as config from 'config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const dbConfig = config.get('db');

export const getTypeORMConfig = (): TypeOrmModuleOptions => {
  return {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME, // [AWS RDB 용]process.env.RDS_HOSTNAME
    port: Number(process.env.RDS_PORT), // [AWS RDB 용]process.env.RDS_PORT
    username: process.env.RDS_USERNAME, // [AWS RDB 용]process.env.RDS_USERNAME
    password: process.env.RDS_PASSWORD, // [AWS RDB 용]process.env.RDS_PASSWORD
    database: process.env.RDS_DB_NAME, // [AWS RDB 용]process.env.RDS_DB_NAME
    entities: [__dirname + '/../**/*.entity.{js,ts}', Board],
    namingStrategy: new SnakeNamingStrategy(),
    logging: true,
    synchronize: dbConfig.synchronize,
  };
};

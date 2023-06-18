import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';
import * as config from 'config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME, // [AWS RDB 용]process.env.RDS_HOSTNAME
  port: process.env.RDS_PORT as number, // [AWS RDB 용]process.env.RDS_PORT
  username: process.env.RDS_USERNAME, // [AWS RDB 용]process.env.RDS_USERNAME
  password: dbConfig.password, // [AWS RDB 용]process.env.RDS_PASSWORD
  database: dbConfig.database, // [AWS RDB 용]process.env.RDS_DB_NAME
  entities: [__dirname + '/../**/*.entity.{js,ts}', Board],
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
  synchronize: dbConfig.synchronize,
};

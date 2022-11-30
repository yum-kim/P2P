import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host, // [AWS RDB 용]process.env.RDS_HOSTNAME
  port: dbConfig.port, // [AWS RDB 용]process.env.RDS_PORT
  username: dbConfig.username, // [AWS RDB 용]process.env.RDS_USERNAME
  password: dbConfig.password, // [AWS RDB 용]process.env.RDS_PASSWORD
  database: dbConfig.host.database, // [AWS RDB 용]process.env.RDS_DB_NAME
  entities: [__dirname + '/../**/*.entity.{js,ts}', Board],
  synchronize: dbConfig.synchronize,
};

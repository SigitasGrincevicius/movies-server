import { DataSource } from "typeorm";

export default new DataSource({
  type: 'postgres',
  host: 'zzz',
  port: 123,
  username: 'edc',
  password: '*',
  database: 'test',
  entities: ['**/*.entity.js'],
  migrations: ['migrations/*.js'],
})
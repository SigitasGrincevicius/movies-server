import { DataSource } from "typeorm";

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'm22log33',
  database: 'movies-db',
  entities: ['**/*.entity.js'],
  migrations: ['migrations/*.js'],
})
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(config: ConfigService): Promise<void> {
  // Create the connection with datasource
  const AppDataSource = await new DataSource({
    type: 'postgres',
    // entities: [User, Movie, Genre],
    synchronize: config.get('database.synchronize'), // only for development
    port: config.get('database.port'),
    username: config.get('database.user'),
    password: config.get('database.password'),
    host: config.get('database.host'),
    database: config.get('database.name'),
  }).initialize();
  // Drop all tables
  await AppDataSource.dropDatabase();
  // Close the connection
  await AppDataSource.destroy();
}

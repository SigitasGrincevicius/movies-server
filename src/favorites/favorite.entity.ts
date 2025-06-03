import { Movie } from 'src/movies/movie.entity';
import { User } from 'src/users/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.favorites, { eager: true })
  user: User;

  @ManyToOne(() => Movie, (user) => user.favorites, { eager: true })
  movie: Movie;

  @CreateDateColumn()
  CreatedDate: Date;
}

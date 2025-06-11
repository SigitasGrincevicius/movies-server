import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from 'src/movies/movie.entity';
import { Exclude } from 'class-transformer';
import { Favorite } from 'src/favorites/favorite.entity';
import { Comment } from 'src/comments/comment.entity';
import { UserRole } from './enums/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  @Exclude()
  password?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Exclude()
  googleId?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  @Exclude()
  role: UserRole;

  @OneToMany(() => Movie, (movie) => movie.createdBy)
  movies?: Movie[]; // List of movies created by the user

  @OneToMany(() => Comment, (comment) => comment.createdBy)
  comments?: Comment[];

  @OneToMany(() => Favorite, (favorite) => favorite.movie)
  favorites?: Favorite[];
  
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}

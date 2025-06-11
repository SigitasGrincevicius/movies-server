import { Favorite } from 'src/favorites/favorite.entity';
import { Genre } from 'src/genres/genre.entity';
import { User } from 'src/users/user.entity';
import { Comment } from 'src/comments/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  releaseYear: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  director: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 1,
    nullable: false,
  })
  rating: number;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  imageUrl: string;

  @ManyToMany(() => Genre, (genre) => genre.movies, { eager: true })
  @JoinTable()
  genres: Genre[];

  @OneToMany(() => Comment, (comment) => comment.movie, {
    nullable: true,
    eager: true,
  })
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.movies, {
    nullable: false,
    eager: true,
  })
  createdBy: User;

  @OneToMany(() => Favorite, (favorite) => favorite.movie)
  favorites?: Favorite[];
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Author } from '../../author/entities/author.entity';
import { BookReview } from '../../book-review/entities/book-review.entity';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  publicationYear: number;

  @Column({ default: true })
  isAvailable: boolean;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @OneToMany(() => BookReview, (review) => review.book)
  reviews: BookReview[];

  @ManyToMany(() => Category, (category) => category.books)
  @JoinTable()
  categories: Category[];
}
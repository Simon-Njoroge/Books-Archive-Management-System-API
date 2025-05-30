import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  
} from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToMany(() => Book, (book) => book.categories)
  books: Book[];
}
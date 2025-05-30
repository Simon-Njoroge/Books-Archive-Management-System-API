import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Book } from './entities/book.entity';
import { Category } from '../category/entities/category.entity';
import { Author } from '../author/entities/author.entity'; // Import Author entity
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>, // Inject Author repository
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { categoryIds, authorId, ...bookData } = createBookDto;

    const categories = categoryIds?.length
      ? await this.categoryRepository.find({ where: { id: In(categoryIds) } })
      : [];

    const author = await this.authorRepository.findOne({ where: { id: authorId } });
    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }

    const book = this.bookRepository.create({
      ...bookData,
      categories,
      author,
    });

    return this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: ['categories', 'author', 'reviews'],
    });
  }

  async findAllFiltered(filters: {
    title?: string;
    authorId?: string;
    categoryId?: string;
  }): Promise<Book[]> {
    const query = this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.categories', 'category')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.reviews', 'reviews');

    if (filters.title) {
      query.andWhere('LOWER(book.title) LIKE :title', {
        title: `%${filters.title.toLowerCase()}%`,
      });
    }

    if (filters.authorId) {
      query.andWhere('author.id = :authorId', { authorId: filters.authorId });
    }

    if (filters.categoryId) {
      query.andWhere('category.id = :categoryId', {
        categoryId: filters.categoryId,
      });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['categories', 'author', 'reviews'],
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    const { categoryIds, authorId, ...updateData } = updateBookDto;

    if (categoryIds) {
      const categories = await this.categoryRepository.find({
        where: { id: In(categoryIds) },
      });
      book.categories = categories;
    }

    if (authorId) {
      const author = await this.authorRepository.findOne({ where: { id: authorId } });
      if (!author) {
        throw new NotFoundException(`Author with ID ${authorId} not found`);
      }
      book.author = author;
    }

    Object.assign(book, updateData);

    return this.bookRepository.save(book);
  }

  async remove(id: string): Promise<{ message: string }> {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
    return { message: `Book with ID ${id} has been removed.` };
  }
}

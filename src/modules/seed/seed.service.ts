import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Category } from '../category/entities/category.entity';
import { Author } from '../author/entities/author.entity';
import { Book } from '../book/entities/book.entity';
import { BookReview } from '../book-review/entities/book-review.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  private readonly BATCH_SIZE = 5000;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(BookReview) private readonly bookReviewRepository: Repository<BookReview>,
  ) {}

  async seed(): Promise<string> {
    this.logger.log('Start seeding...');

    await this.seedUsersAndProfiles(1_000_000);
    await this.seedCategories(1_000_000);
    await this.seedAuthors(1_000_000);
    await this.seedBooks(1_000_000);
    await this.seedBookReviews(1_000_000);

    this.logger.log('Seeding completed!');
    return 'Database seeded with 1 million records per entity.';
  }

  private async seedUsersAndProfiles(count: number) {
    for (let i = 0; i < count; i += this.BATCH_SIZE) {
      const users: User[] = [];
      const profiles: Profile[] = [];

      for (let j = 0; j < this.BATCH_SIZE; j++) {
        const user = this.userRepository.create({
          email: faker.internet.email(),
          password: faker.internet.password(),
        });
        users.push(user);
      }

      const savedUsers = await this.userRepository.save(users);

      for (const user of savedUsers) {
        profiles.push(
          this.profileRepository.create({
            bio: faker.lorem.sentence(),
            user,
          }),
        );
      }

      await this.profileRepository.save(profiles);
      this.logger.log(`Seeded ${Math.min(i + this.BATCH_SIZE, count)} Users and Profiles`);
    }
  }

  private async seedCategories(count: number) {
    for (let i = 0; i < count; i += this.BATCH_SIZE) {
      const categories: Category[] = [];

      for (let j = 0; j < this.BATCH_SIZE; j++) {
        categories.push(
          this.categoryRepository.create({
            name: faker.commerce.department() + faker.string.uuid(),
          }),
        );
      }

      await this.categoryRepository.save(categories);
      this.logger.log(`Seeded ${Math.min(i + this.BATCH_SIZE, count)} Categories`);
    }
  }

  private async seedAuthors(count: number) {
    for (let i = 0; i < count; i += this.BATCH_SIZE) {
      const authors: Author[] = [];

      for (let j = 0; j < this.BATCH_SIZE; j++) {
        authors.push(
          this.authorRepository.create({
            name: faker.person.fullName(),
            bio: faker.lorem.paragraph(),
          }),
        );
      }

      await this.authorRepository.save(authors);
      this.logger.log(`Seeded ${Math.min(i + this.BATCH_SIZE, count)} Authors`);
    }
  }

  private async seedBooks(count: number) {
  const authorIds = (await this.authorRepository.find({ select: ['id'] })).map(a => a.id);
  const categoryIds = (await this.categoryRepository.find({ select: ['id'] })).map(c => c.id);

  for (let i = 0; i < count; i += this.BATCH_SIZE) {
    const books: Book[] = [];

    for (let j = 0; j < this.BATCH_SIZE; j++) {
      const randomAuthorId = faker.helpers.arrayElement(authorIds);
      const randomCategoryIds = faker.helpers.arrayElements(categoryIds, 3);

      
      books.push(
        this.bookRepository.create({
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          publicationYear: faker.number.int({ min: 1980, max: 2024 }),
          isAvailable: faker.datatype.boolean(),
          author: { id: randomAuthorId },
          categories: randomCategoryIds.map(id => ({ id })),
        }),
      );
    }

    await this.bookRepository.save(books);
    this.logger.log(`Seeded ${Math.min(i + this.BATCH_SIZE, count)} Books`);
  }
}

  private async seedBookReviews(count: number) {
    const userIds = (await this.userRepository.find({ select: ['id'] })).map(u => u.id);
    const bookIds = (await this.bookRepository.find({ select: ['id'] })).map(b => b.id);

    for (let i = 0; i < count; i += this.BATCH_SIZE) {
      const reviews: BookReview[] = [];

      for (let j = 0; j < this.BATCH_SIZE; j++) {
        reviews.push(
          this.bookReviewRepository.create({
            comment: faker.lorem.sentence(),
            rating: faker.number.int({ min: 1, max: 5 }),
            user: { id: faker.helpers.arrayElement(userIds) },
            book: { id: faker.helpers.arrayElement(bookIds) },
          }),
        );
      }

      await this.bookReviewRepository.save(reviews);
      this.logger.log(`Seeded ${Math.min(i + this.BATCH_SIZE, count)} BookReviews`);
    }
  }
}

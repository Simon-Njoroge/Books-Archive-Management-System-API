import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { User } from '../user/entities/user.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Category } from '../category/entities/category.entity';
import { Author } from '../author/entities/author.entity';
import { Book } from '../book/entities/book.entity';
import { BookReview } from '../book-review/entities/book-review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
   imports:[
  TypeOrmModule.forFeature([
    User,
    Profile,
    Category,
    Author,
    Book,
    BookReview,
   ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}

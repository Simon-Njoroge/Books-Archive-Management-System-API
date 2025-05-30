import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { DatabaseModule } from 'src/config/database.module';
import { Category } from '../category/entities/category.entity';
@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Book, Category]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}

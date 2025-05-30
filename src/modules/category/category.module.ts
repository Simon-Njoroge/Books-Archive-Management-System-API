import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DatabaseModule } from 'src/config/database.module';

@Module({
  imports: [
  DatabaseModule,
  TypeOrmModule.forFeature([Category])
  ], 
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

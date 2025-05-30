import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { config } from 'process';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthorModule } from './modules/author/author.module';
import { BookModule } from './modules/book/book.module';
import { CategoryModule } from './modules/category/category.module';
import { BookReviewModule } from './modules/book-review/book-review.module';
import { SeedModule } from './modules/seed/seed.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
      }),
      UserModule,
      ProfileModule,
      AuthorModule,
      BookModule,
      CategoryModule,
      BookReviewModule,
      SeedModule,
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

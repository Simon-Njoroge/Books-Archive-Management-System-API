import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DatabaseModule } from 'src/config/database.module';
import { Profile } from '../profile/entities/profile.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    DatabaseModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

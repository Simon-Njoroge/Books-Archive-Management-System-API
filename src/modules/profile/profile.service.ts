import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(Profile) private readonly profileRepository:Repository <Profile>) {}
  async create(createProfileDto: CreateProfileDto) {
    const profile = await this.profileRepository.create(createProfileDto);
    return this.profileRepository.save(profile);
  }

  async findAll() {
    return await this.profileRepository.find();
  }

  async findOne(id: number) {
    return await this.profileRepository.findOne({
      where: { id: id.toString()},
      relations: ['user'], 
    });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    return await this.profileRepository.update(id, updateProfileDto).then(() => {
      return this.findOne(id);
    });
  }

  async remove(id: number)  {
    const profile = await this.findOne(id);
    if (!profile) {
      throw new Error(`Profile with id ${id} not found`);
    }
    return await this.profileRepository.remove(profile);
  }
}

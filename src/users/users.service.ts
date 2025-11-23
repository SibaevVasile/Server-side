import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException(`User cu id ${id} nu există`);
    return user;
  }

  create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    await this.userRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
  }
}
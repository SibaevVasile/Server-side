import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('details/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}

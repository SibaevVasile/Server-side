import { Controller, Get, Param, Query, NotFoundException, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { UppercasePipe } from '../pipes/uppercase.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @Get('test/uppercase')
  estUppercase(@Query('name', UppercasePipe) name: string) {
    return { transformedName: name };
}

  @Get('search/by-name')
  searchByUsername(@Query('name', UppercasePipe) name: string) {
    const result = this.usersService.findByName(name);
    if (!result) {
      throw new NotFoundException(`User cu username-ul ${name} nu există`);
    }
    return result;
  }
}

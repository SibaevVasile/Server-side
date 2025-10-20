import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Vasile', email: 'vasile@example.com' },
    { id: 2, name: 'Maria', email: 'maria@example.com' },
    { id: 3, name: 'Ion', email: 'ion@example.com' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  transformNameToUppercase(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`User cu id ${id} nu există`);
    
    user.name = user.name.toUpperCase(); // transformăm și salvăm
    return user;
  }
  
  findByName(username: string) {
    return this.users.find(
      (user) => user.name.toUpperCase() === username.toUpperCase(),
    );
  }
}

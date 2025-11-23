import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { PizzasModule } from './pizzas/pizzas.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: true,
    }),

    ProductsModule,
    PizzasModule,
    UsersModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
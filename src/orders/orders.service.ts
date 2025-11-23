import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>
  ) {}

  findAll(): Promise<Order[]> {
    return this.orderRepo.find();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepo.findOneBy({ id });
    if (!order) throw new NotFoundException(`Order cu id ${id} nu există`);
    return order;
  }

  create(dto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepo.create(dto);
    return this.orderRepo.save(order);
  }

  async update(id: number, dto: UpdateOrderDto): Promise<Order> {
    await this.orderRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepo.remove(order);
  }
}
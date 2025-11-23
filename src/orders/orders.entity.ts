import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Product } from '../products/entities/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  quantity: number;

  @Column()
  status: string;
}
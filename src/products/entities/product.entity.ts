import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('float')
  price: number;

  @Column()
  category: string;

  @Column({ default: true })
  isAvailable: boolean;
}

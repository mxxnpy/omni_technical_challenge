import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  fromId: string;

  @Column('uuid')
  toId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;
}

import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  birthdate: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;
}

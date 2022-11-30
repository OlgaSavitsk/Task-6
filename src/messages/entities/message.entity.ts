import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  name?: string;
  @Column()
  title?: string;
  @Column()
  text: string;
  @Column()
  recipient: string;
  @Column()
  createdAt?: string;
}

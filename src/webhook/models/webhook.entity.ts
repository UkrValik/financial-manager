import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('webhook')
export class WebhookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  url: string;
}

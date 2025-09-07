import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}

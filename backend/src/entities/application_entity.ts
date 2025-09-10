import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}

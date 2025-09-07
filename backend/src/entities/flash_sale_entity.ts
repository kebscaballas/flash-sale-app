import { Column, Entity } from 'typeorm';
import { ApplicationEntity } from './application_entity';

@Entity('flash_sales')
export default class FlashSaleEntitys extends ApplicationEntity {
  @Column({ type: 'timestamp', nullable: true })
  started_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  ended_at: Date;
}

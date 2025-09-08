import { Column, Entity } from 'typeorm';
import { ApplicationEntity } from './application_entity';
import { Expose } from 'class-transformer';

@Entity('flash_sales')
export default class FlashSaleEntity extends ApplicationEntity {
  @Column({ type: 'timestamptz', nullable: true })
  started_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  ended_at: Date;

  @Expose()
  get status(): string {
    const currentTime = new Date().getTime();
    const startedAt = new Date(this.started_at).getTime();
    const endedAt = new Date(this.ended_at).getTime();

    if (currentTime < startedAt) {
      return 'upcoming';
    } else if (currentTime > endedAt) {
      return 'ended';
    } else {
      return 'active';
    }
  }
}

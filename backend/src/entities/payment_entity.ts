import { Column, Entity } from 'typeorm';
import { ApplicationEntity } from './application_entity';

@Entity('payments')
export default class PaymentEntity extends ApplicationEntity {
  @Column({ type: 'decimal' })
  amount: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  product_id: string;
}

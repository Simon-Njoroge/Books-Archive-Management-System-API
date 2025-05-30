import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { BookReview } from '../../book-review/entities/book-review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile;

  @OneToMany(() => BookReview, (review) => review.user)
  reviews: BookReview[];

  @BeforeInsert()
  @BeforeUpdate()
  /**
   * Converts the user's email address to lowercase if it exists.
   * This ensures email consistency for storage and comparison.
   */

  async normalizeEmail() {
    // Ensure email is defined before attempting to convert to lowercase
  if(this.email) {
    this.email = this.email.toLowerCase();
  }
}
}

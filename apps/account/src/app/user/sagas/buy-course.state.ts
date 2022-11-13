import { UserEntity } from '../entities/user.entity';
import BuyCourseSaga from './buy-course.saga';

// Abstract state pattern
// Concrete classes implement it
export default abstract class BuyCourseSagaState {
  public saga: BuyCourseSaga;

  public setContext(saga: BuyCourseSaga) {
    this.saga = saga;
  }

  public abstract pay(): Promise<{ payLink: string; user: UserEntity }>;
  public abstract checkPayment(): Promise<{ user: UserEntity }>;
  public abstract cancel(): Promise<{ user: UserEntity }>;
}

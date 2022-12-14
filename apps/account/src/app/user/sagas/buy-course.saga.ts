import { PurchaseState } from '@purple/interfaces';
import { RMQService } from 'nestjs-rmq';
import { UserEntity } from '../entities/user.entity';
import BuyCourseSagaState from './buy-course.state';
import {
  BuyCourseSagaStateCancelled,
  BuyCourseSagaStatePurchased,
  BuyCourseSagaStateWaitingForPayment,
  BuyCourseSagaStateStarted,
} from './buy-course.steps';

export default class BuyCourseSaga {
  private state: BuyCourseSagaState;

  constructor(
    public user: UserEntity,
    public courseId: string,
    public rmqService: RMQService
  ) {}

  getSate() {
    return this.state;
  }

  setState(state: PurchaseState, courseId: string) {
    switch (state) {
      case PurchaseState.Started:
        this.state = new BuyCourseSagaStateStarted();
        break;
      case PurchaseState.WaitingForPayment:
        this.state = new BuyCourseSagaStateWaitingForPayment();
        break;
      case PurchaseState.Purchased:
        this.state = new BuyCourseSagaStatePurchased();
        break;
      case PurchaseState.Canceled:
        this.state = new BuyCourseSagaStateCancelled();
        break;
    }

    // Set ctx
    // apply state
    this.state.setContext(this);
    this.user.setCourseStatus(courseId, state);
  }
}

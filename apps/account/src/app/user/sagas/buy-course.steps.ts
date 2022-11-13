import {
  CourseGetCourse,
  PaymentCheck,
  PaymentGenerateLink,
} from '@purple/contracts';
import { PurchaseState } from '@purple/interfaces';
import { UserEntity } from '../entities/user.entity';
import BuyCourseSagaState from './buy-course.state';

export class BuyCourseSagaStateStarted extends BuyCourseSagaState {
  public async pay(): Promise<{ payLink: string; user: UserEntity }> {
    const { course } = await this.saga.rmqService.send<
      CourseGetCourse.Request,
      CourseGetCourse.Response
    >(CourseGetCourse.topic, { id: this.saga.courseId });
    if (!course) {
      throw new Error('No such course');
    }
    if (course.price === 0) {
      this.saga.setState(PurchaseState.Purchased, course._id);
      return { payLink: null, user: this.saga.user };
    }

    const { payLink } = await this.saga.rmqService.send<
      PaymentGenerateLink.Request,
      PaymentGenerateLink.Response
    >(PaymentGenerateLink.topic, {
      courseId: course._id,
      userId: this.saga.user._id,
      sum: course.price,
    });
    this.saga.setState(PurchaseState.WaitingForPayment, course._id);
    return { payLink: payLink, user: this.saga.user };
  }

  public checkPayment(): Promise<{ user: UserEntity }> {
    throw new Error('Cannot check payment that didnt start');
  }
  public async cancel(): Promise<{ user: UserEntity }> {
    this.saga.setState(PurchaseState.Canceled, this.saga.courseId);
    return { user: this.saga.user };
  }
}

export class BuyCourseSagaStateWaitingForPayment extends BuyCourseSagaState {
  public pay(): Promise<{ payLink: string; user: UserEntity }> {
    throw new Error('Payment already in progress');
  }
  public async checkPayment(): Promise<{ user: UserEntity }> {
    const { status } = await this.saga.rmqService.send<
      PaymentCheck.Request,
      PaymentCheck.Response
    >(PaymentCheck.topic, {
      userId: this.saga.user._id,
      courseId: this.saga.courseId,
    });
    if (status === 'canceled') {
      this.saga.setState(PurchaseState.Canceled, this.saga.courseId);
      return { user: this.saga.user };
    }
    if (status !== 'success') {
      return { user: this.saga.user };
    }
    this.saga.setState(PurchaseState.Purchased, this.saga.courseId);
    return { user: this.saga.user };
  }
  public cancel(): Promise<{ user: UserEntity }> {
    throw new Error('Cannot cancel payment in progress');
  }
}

export class BuyCourseSagaStatePurchased extends BuyCourseSagaState {
  public pay(): Promise<{ payLink: string; user: UserEntity }> {
    throw new Error('Payment finished');
  }
  public async checkPayment(): Promise<{ user: UserEntity }> {
    throw new Error('Payment finished');
  }
  public cancel(): Promise<{ user: UserEntity }> {
    throw new Error('Payment finished');
  }
}

export class BuyCourseSagaStateCancelled extends BuyCourseSagaState {
  public pay(): Promise<{ payLink: string; user: UserEntity }> {
    this.saga.setState(PurchaseState.Started, this.saga.courseId);
    return this.saga.getSate().pay();
  }
  public async checkPayment(): Promise<{ user: UserEntity }> {
    throw new Error('Payment cancelled');
  }
  public cancel(): Promise<{ user: UserEntity }> {
    throw new Error('Payment cancelled');
  }
}

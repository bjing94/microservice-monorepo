export enum UserRole {
  Teacher = 'Teacher',
  Student = 'Studen',
}

export enum PurchaseState {
  Started = 'Started',
  WaitingForPayment = 'WaitingForPayment',
  Purchased = 'Purchased',
  Canceled = 'Canceled',
}

export interface AbstractUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  courses?: AbstractUserCourses[];
}

export interface AbstractUserCourses {
  courseId: string;
  purchaseState: PurchaseState;
}

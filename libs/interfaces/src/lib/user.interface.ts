export enum UserRole {
  Teacher = 'Teacher',
  Student = 'Studen',
}
export interface AbstractUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

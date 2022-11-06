export enum UserRole {
  Teacher = 'Teacher',
  Student = 'Studen',
}
export interface User {
  _id?: string;
  displayName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

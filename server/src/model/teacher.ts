import { User } from './user';

export interface Teacher extends User {
  name: string;
  department: string;
  course_ids : string[];
}
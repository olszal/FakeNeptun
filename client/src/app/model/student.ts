import { User } from './user';

export interface Student extends User {
  name : string;
  faculty : string;
  semester : number;
  course_ids : string[];
}

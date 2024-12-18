import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { Teacher } from '../model/teacher';
import { AuthService } from './authservice';
import { LoginComponent } from '../component/login/login/login.component';
import { User } from '../model/user'; 

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private url = 'http://localhost:5200';
  courses$ = signal<Course[]>([]);
  course$ = signal<Course>({} as Course);
  
 
  constructor(private httpClient: HttpClient) { }

  private refreshCourses() {
    this.httpClient.get<Course[]>(`${this.url}/courses`)
      .subscribe(courses => {
        this.courses$.set(courses);
      });
  }

  getCourses() {
    this.refreshCourses();
    return this.courses$();
  }

  getCourse(id: string) {
    this.httpClient.get<Course>(`${this.url}/courses/${id}`).subscribe(course => {
      this.course$.set(course);
      return this.course$();
    });
  }

  createCourse(course: Course, user: User) {
    course.accepted = false;
    course.student_ids = [];
    course.teacher_id = user._id || "";
    course.student_ids = [];
    return this.httpClient.post(`${this.url}/courses`, course, { responseType: 'text' });
  }

  updateCourse(id: string, course: Course) {
    return this.httpClient.put(`${this.url}/courses/${id}`, course, { responseType: 'text' });
  }

  deleteCourse(id: string) {
    return this.httpClient.delete(`${this.url}/courses/${id}`, { responseType: 'text' });
  }
}
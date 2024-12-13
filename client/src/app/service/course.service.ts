import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
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

  createCourse(course: Course) {
    course.accepted = false;
    return this.httpClient.post(`${this.url}/courses`, course, { responseType: 'text' });
  }

  updateCourse(id: string, course: Course) {
    return this.httpClient.put(`${this.url}/courses/${id}`, course, { responseType: 'text' });
  }

  deleteCourse(id: string) {
    return this.httpClient.delete(`${this.url}/courses/${id}`, { responseType: 'text' });
  }
}
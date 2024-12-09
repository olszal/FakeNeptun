import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = 'http://localhost:5200';
  students$ = signal<Student[]>([]);
  student$ = signal<Student>({} as Student);
 
  constructor(private httpClient: HttpClient) { }

  private refreshStudents() {
    this.httpClient.get<Student[]>(`${this.url}/students`)
      .subscribe(students => {
        this.students$.set(students);
      });
  }

  getStudents() {
    this.refreshStudents();
    return this.students$();
  }

  getStudent(id: string) {
    this.httpClient.get<Student>(`${this.url}/students/${id}`).subscribe(student => {
      this.student$.set(student);
      return this.student$();
    });
  }

  createStudent(student: Student) {
    student.activated = false;
    return this.httpClient.post(`${this.url}/students`, student, { responseType: 'text' });
  }

  updateStudent(id: string, student: Student) {
    return this.httpClient.put(`${this.url}/students/${id}`, student, { responseType: 'text' });
  }

  deleteStudent(id: string) {
    return this.httpClient.delete(`${this.url}/students/${id}`, { responseType: 'text' });
  }
}
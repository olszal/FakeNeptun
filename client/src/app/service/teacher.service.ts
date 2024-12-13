import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../model/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private url = 'http://localhost:5200';
  teachers$ = signal<Teacher[]>([]);
  teacher$ = signal<Teacher>({} as Teacher);
 
  constructor(private httpClient: HttpClient) { }

  private refreshTeachers() {
    this.httpClient.get<Teacher[]>(`${this.url}/teachers`)
      .subscribe(teachers => {
        this.teachers$.set(teachers);
      });
  }

  getTeachers() {
    this.refreshTeachers();
    return this.teachers$();
  }

  getTeacher(id: string) {
    this.httpClient.get<Teacher>(`${this.url}/teachers/${id}`).subscribe(teacher => {
      this.teacher$.set(teacher);
      return this.teacher$();
    });
  }

  createTeacher(teacher: Teacher) {
    teacher.activated = false;
    return this.httpClient.post(`${this.url}/teachers`, teacher, { responseType: 'text' });
  }

  updateTeacher(id: string, teacher: Teacher) {
    return this.httpClient.put(`${this.url}/teachers/${id}`, teacher, { responseType: 'text' });
  }

  deleteTeacher(id: string) {
    return this.httpClient.delete(`${this.url}/teachers/${id}`, { responseType: 'text' });
  }
}
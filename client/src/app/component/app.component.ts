import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentsListComponent } from './student/students-list/students-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TeachersListComponent } from './teacher/teacher-list/teacher-list.component';
import { CoursesListComponent } from './course/course-list/course-list.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, MatToolbarModule, LoginComponent ],
  styles: [
    `
      main {
        display: flex;
        justify-content: center;
        padding: 2rem 4rem;
      }
    `,
  ],
  template: `
    <mat-toolbar>
      <span>Fake Neptun System</span>
    </mat-toolbar>
    <main>
      <router-outlet />
    </main>
  `,
})
export class AppComponent {
  title = 'client';
}

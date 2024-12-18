import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CourseFormComponent } from '../course-form/course-form.component';
import { Course } from '../../../model/course';
import { LoginComponent } from '../../login/login/login.component';
import { CourseService } from '../../../service/course.service';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../service/authservice';
import { User } from '../../../model/user';
import { Teacher } from '../../../model/teacher';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ CourseFormComponent, MatCardModule, LoginComponent ],
  templateUrl: './add-course.template.html',
  styles: ``,
})
export class AddCourseComponent {

  constructor(private router: Router, private courseService: CourseService, private authService: AuthService) {}

  addCourse(course: Course) {
    //if (!this.authService.isLoggedIn()) return;
    this.courseService.createCourse(course, this.authService.getUser()).subscribe({
      next: () => {
        this.router.navigate(['/courses']);
      },
      error: (error) => {
        alert('Failed to create course');
        console.error(error);
      },
    });
    this.courseService.getCourses();
  }
}

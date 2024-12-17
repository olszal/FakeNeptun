import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseFormComponent } from '../course-form/course-form.component';
import { Course } from '../../../model/course';
import { CourseService } from '../../../service/course.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ CourseFormComponent, MatCardModule ],
  templateUrl: './add-course.template.html',
  styles: ``,
})
export class AddCourseComponent {

  constructor(private router: Router, private courseService: CourseService) {}

  addCourse(course: Course) {
    this.courseService.createCourse(course).subscribe({
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

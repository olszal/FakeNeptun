import { Component, OnInit, WritableSignal } from '@angular/core';
import { CourseFormComponent } from '../course-form/course-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../../model/course';
import { CourseService } from '../../../service/course.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [ CourseFormComponent, MatCardModule ],
  templateUrl: './edit-course.template.html',
  styles: ``,
})
export class EditCourseComponent implements OnInit {
  course = {} as WritableSignal<Course>;

  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.courseService.getCourse(id!);
    this.course = this.courseService.course$;
  }

  editCourse(course: Course) {
    this.courseService
      .updateCourse(this.course()._id || '', course)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert('Failed to update course');
          console.error(error);
        },
      });
  }
}
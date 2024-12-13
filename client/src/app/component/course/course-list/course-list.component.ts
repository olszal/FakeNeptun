import { Component, OnInit, WritableSignal } from '@angular/core';
import { Course } from '../../../model/course';
import { CourseService } from '../../../service/course.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styleUrls: [ './course-list.styles.css' ],
  templateUrl: './course-list.template.html',
})
export class CoursesListComponent implements OnInit {
  courses$ = {} as WritableSignal<Course[]>;
  displayedColumns: string[] = [ 'col-title', 'col-description', 'col-timetable',
     'col-room', 'col-student_limit', 'col-action' ]

  constructor(private coursesService: CourseService) {}

  ngOnInit() {
    this.fetchCourses();
  }

  deleteCourse(id: string): void {
    this.coursesService.deleteCourse(id).subscribe({
      next: () => this.fetchCourses(),
    });
  }

  private fetchCourses(): void {
    this.courses$ = this.coursesService.courses$;
    this.coursesService.getCourses();
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherFormComponent } from '../teacher-form/teacher-form.component';
import { Teacher } from '../../../model/teacher';
import { TeacherService } from '../../../service/teacher.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [ TeacherFormComponent, MatCardModule ],
  templateUrl: './add-teacher.template.html',
  styles: ``,
})
export class AddTeacherComponent {

  constructor(private router: Router, private teacherService: TeacherService) {}

  addTeacher(teacher: Teacher) {
    this.teacherService.createTeacher(teacher).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Failed to create teacher');
        console.error(error);
      },
    });
    this.teacherService.getTeachers();
  }
}


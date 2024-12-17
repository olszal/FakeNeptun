import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentFormComponent } from '../student-form/student-form.component';
import { Student } from '../../../model/student';
import { StudentService } from '../../../service/student.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [ StudentFormComponent, MatCardModule ],
  templateUrl: './add-student.template.html',
  styles: ``,
})
export class AddStudentComponent {

  constructor(private router: Router, private studentService: StudentService) {}

  addStudent(student: Student) {
    this.studentService.createStudent(student).subscribe({
      next: () => {
        this.router.navigate(['/students']);
      },
      error: (error) => {
        alert('Failed to create student');
        console.error(error);
      },
    });
    this.studentService.getStudents();
  }
}

import { Component, OnInit, WritableSignal } from '@angular/core';
import { StudentFormComponent } from '../student-form/student-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../../model/student';
import { StudentService } from '../../../service/student.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [ StudentFormComponent, MatCardModule ],
  templateUrl: './edit-student.template.html',
  styles: ``,
})
export class EditStudentComponent implements OnInit {
  student = {} as WritableSignal<Student>;

  constructor(private router: Router, private route: ActivatedRoute, private studentService: StudentService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.studentService.getStudent(id!);
    this.student = this.studentService.student$;
  }

  editStudent(student: Student) {
    this.studentService
      .updateStudent(this.student()._id || '', student)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert('Failed to update student');
          console.error(error);
        },
      });
  }
}

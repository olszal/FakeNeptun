import { Component, OnInit, WritableSignal } from '@angular/core';
import { Student } from '../../../model/student';
import { StudentService } from '../../../service/student.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styleUrls: [ './student-list.styles.css' ],
  templateUrl: './student-list.template.html',
})
export class StudentsListComponent implements OnInit {
  students$ = {} as WritableSignal<Student[]>;
  displayedColumns: string[] = [ 'col-name', 'col-faculty', 'col-semester', 'col-action' ]

  constructor(private studentsService: StudentService) {}

  ngOnInit() {
    this.fetchStudents();
  }

  deleteStudent(id: string): void {
    this.studentsService.deleteStudent(id).subscribe({
      next: () => this.fetchStudents(),
    });
  }

  private fetchStudents(): void {
    this.students$ = this.studentsService.students$;
    this.studentsService.getStudents();
  }
}


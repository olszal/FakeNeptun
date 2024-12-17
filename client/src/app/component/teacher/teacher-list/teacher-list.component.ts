import { Component, OnInit, WritableSignal } from '@angular/core';
import { Teacher } from '../../../model/teacher';
import { TeacherService } from '../../../service/teacher.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-teachers-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styleUrls: [ './teacher-list.styles.css' ],
  templateUrl: './teacher-list.template.html',
})
export class TeachersListComponent implements OnInit {
  teachers$ = {} as WritableSignal<Teacher[]>;
  displayedColumns: string[] = [ 'col-name', 'col-department', 'col-action' ]

  constructor(private teachersService: TeacherService) {}

  ngOnInit() {
    this.fetchTeachers();
  }

  deleteTeacher(id: string): void {
    this.teachersService.deleteTeacher(id).subscribe({
      next: () => this.fetchTeachers(),
    });
  }

  private fetchTeachers(): void {
    this.teachers$ = this.teachersService.teachers$;
    this.teachersService.getTeachers();
  }
}

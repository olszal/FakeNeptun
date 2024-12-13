import { Component, OnInit, WritableSignal } from '@angular/core';
import { TeacherFormComponent } from '../teacher-form/teacher-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from '../../../model/teacher';
import { TeacherService } from '../../../service/teacher.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-teacher',
  standalone: true,
  imports: [ TeacherFormComponent, MatCardModule ],
  templateUrl: './edit-teacher.template.html',
  styles: ``,
})
export class EditTeacherComponent implements OnInit {
  teacher = {} as WritableSignal<Teacher>;

  constructor(private router: Router, private route: ActivatedRoute, private teacherService: TeacherService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.teacherService.getTeacher(id!);
    this.teacher = this.teacherService.teacher$;
  }

  editTeacher(teacher: Teacher) {
    this.teacherService
      .updateTeacher(this.teacher()._id || '', teacher)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert('Failed to update teacher');
          console.error(error);
        },
      });
  }
}

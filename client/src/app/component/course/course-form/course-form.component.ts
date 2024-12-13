import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Course } from '../../../model/course';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatButtonModule ],
  styleUrl: './course-form.styles.css',
  templateUrl: './course-form.template.html',
})
export class CourseFormComponent {
  initialState = input<Course>();
  courseForm;

  @Output()
  formValuesChanged = new EventEmitter<Course>();

  @Output()
  formSubmitted = new EventEmitter<Course>();

  constructor(private formBuilder: FormBuilder) {
    this.courseForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      timetable: ['', [Validators.required, Validators.minLength(3)]],
      room: ['', [Validators.required, Validators.minLength(3)]],
      student_limit: [1, [Validators.required, Validators.min(1)]],
    });

    effect(() => {
      this.courseForm.setValue({
        title: this.initialState()?.title || '',
        description: this.initialState()?.description || '',
        timetable: this.initialState()?.timetable || '',
        room: this.initialState()?.room || '',
        student_limit: this.initialState()?.student_limit || 1,
      });
    });
  }

  get title() {
    return this.courseForm.get('title')!;
  }
  get description() {
    return this.courseForm.get('description')!;
  }
  get timetable() {
    return this.courseForm.get('timetable')!;
  }
  get room() {
    return this.courseForm.get('room')!;
  }
  get student_limit() {
    return this.courseForm.get('student_limit')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.courseForm.value as Course);
  }

}

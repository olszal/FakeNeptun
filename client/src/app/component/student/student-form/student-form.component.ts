import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Student } from '../../../model/student';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatButtonModule ],
  styleUrl: './student-form.styles.css',
  templateUrl: './student-form.template.html',
})
export class StudentFormComponent {
  initialState = input<Student>();
  studentForm;

  @Output()
  formValuesChanged = new EventEmitter<Student>();

  @Output()
  formSubmitted = new EventEmitter<Student>();

  constructor(private formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      faculty: ['', [Validators.required, Validators.minLength(5)]],
      semester: [1, [Validators.required, Validators.min(1)]],
    });

    effect(() => {
      this.studentForm.setValue({
        name: this.initialState()?.name || '',
        faculty: this.initialState()?.faculty || '',
        semester: this.initialState()?.semester || 1,
      });
    });
  }

  get name() {
    return this.studentForm.get('name')!;
  }
  get faculty() {
    return this.studentForm.get('faculty')!;
  }
  get semester() {
    return this.studentForm.get('semester')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.studentForm.value as Student);
  }

}

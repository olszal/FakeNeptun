import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Teacher } from '../../../model/teacher';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatButtonModule ],
  styleUrl: './teacher-form.styles.css',
  templateUrl: './teacher-form.template.html',
})
export class TeacherFormComponent {
  initialState = input<Teacher>();
  teacherForm;

  @Output()
  formValuesChanged = new EventEmitter<Teacher>();

  @Output()
  formSubmitted = new EventEmitter<Teacher>();

  constructor(private formBuilder: FormBuilder) {
    this.teacherForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      department: ['', [Validators.required, Validators.minLength(5)]],
    });

    effect(() => {
      this.teacherForm.setValue({
        name: this.initialState()?.name || '',
        department: this.initialState()?.department || '',
      });
    });
  }

  get name() {
    return this.teacherForm.get('name')!;
  }
  get department() {
    return this.teacherForm.get('department')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.teacherForm.value as Teacher);
  }

}


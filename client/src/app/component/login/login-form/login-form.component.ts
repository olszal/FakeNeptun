import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../../model/user';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatButtonModule ],
  styleUrl: './login-form.styles.css',
  templateUrl: './login-form.template.html',
})
export class LoginFormComponent {
  initialState = input<User>();
  loginForm;

  @Output()
  formValuesChanged = new EventEmitter<User>();

  @Output()
  formSubmitted = new EventEmitter<User>();

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

    effect(() => {
      this.loginForm.setValue({
        username: this.initialState()?.username || '',
        password: this.initialState()?.password || ''
      });
    });
  }

  get username() {
    return this.loginForm.get('username')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }

  login() {
    this.formSubmitted.emit(this.loginForm.value as User);
  }

}

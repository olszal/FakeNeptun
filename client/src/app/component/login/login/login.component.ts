import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormComponent } from '../login-form/login-form.component';
import { User } from '../../../model/user';
import { AuthService } from '../../../service/authservice';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ LoginFormComponent, MatCardModule ],
  templateUrl: './login.template.html',
  styles: ``,
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) {}

  login(user: User) {
    this.authService.login(user).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Failed to login');
        console.error(error);
      },
    });
  }
}

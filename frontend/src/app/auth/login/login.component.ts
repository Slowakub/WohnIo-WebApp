import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const userData = { email: this.email, password: this.password };
    this.authService.login(userData).subscribe(
      (res: any) => {
        this.authService.saveToken(res.access_token);
        this.router.navigate(['/stores']);
      },
      (err) => {
        console.error('Error logging in', err);
      }
    );
  }
}

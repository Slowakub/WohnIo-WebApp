import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email = '';
  password = '';
  role = 'user'; // Default role is 'user'

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    console.log('Register button clicked');
    const userData = { email: this.email, password: this.password, role: this.role }; // Include role
  
    const observer: Observer<any> = {
      next: () => {
        console.log('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error registering', err);
      },
      complete: () => {
        console.log('Registration process complete');
      },
    };
  
    this.authService.register(userData).subscribe(observer);
  }
}

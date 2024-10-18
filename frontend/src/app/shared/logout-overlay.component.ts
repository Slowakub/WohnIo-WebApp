import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-logout-overlay',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './logout-overlay.component.html',
  styleUrls: ['./logout-overlay.component.scss'],
})
export class LogoutOverlayComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated(); 
  }

  logout() {
    this.authService.logout();
  }
}

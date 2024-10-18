import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoutOverlayComponent } from './shared/logout-overlay.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LogoutOverlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'JB Stores';
}

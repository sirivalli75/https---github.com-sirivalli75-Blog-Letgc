import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Mark this component as standalone
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class AppComponent {
  title = 'blog-frontend';
}

import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  title = 'CISA News Scraper';
}

import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { Application } from '../models/application.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  standalone: true,
  imports: [FormsModule , CommonModule ,RouterLink]
})
export class AdminPanelComponent implements OnInit {
  applications: Application[] = [];

  baseUrl = 'http://localhost:5000';
  
  constructor(private service: ApplicationService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(data => this.applications = data);
  }

  save(app: Application) {
    this.service.update(app._id!, app).subscribe(() => alert('Saved!'));
  }

  delete(id: string) {
    if (confirm('Delete?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}
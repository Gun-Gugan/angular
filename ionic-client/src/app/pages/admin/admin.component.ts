import { Component, OnInit } from '@angular/core';
import { ApplicationService, Application } from '../../services/application.service';
import { SHARED_IMPORTS } from '../../shared/ionic-imports';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.scss'],
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class AdminPage implements OnInit {
  applications: Application[] = [];
  baseUrl = 'http://localhost:5000';

  constructor(private service: ApplicationService) {}

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe(data => this.applications = data);
  }

  save(app: Application) {
    this.service.update(app._id!, app).subscribe(() => alert('Saved!'));
  }

  delete(id: string) {
    if (confirm('Delete this entry?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}
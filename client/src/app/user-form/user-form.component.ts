import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../services/application.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [FormsModule , CommonModule , RouterLink] 
})
export class UserFormComponent {
  form = { name: '', email: '', phone: '', message: '' };
  success = false;

  constructor(private service: ApplicationService) {}

  submit() {
    this.service.submit(this.form).subscribe(() => {
      this.success = true;
      this.form = { name: '', email: '', phone: '', message: '' };
      setTimeout(() => this.success = false, 4000);
    });
  }
}

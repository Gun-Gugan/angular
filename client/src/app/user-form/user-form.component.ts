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
  imports: [FormsModule, CommonModule, RouterLink]
})
export class UserFormComponent {
  form = { name: '', email: '', phone: '', message: '' };
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  success = false;

  constructor(private service: ApplicationService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Show preview
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('name', this.form.name);
    formData.append('email', this.form.email);
    formData.append('phone', this.form.phone);
    formData.append('message', this.form.message);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.service.submit(formData).subscribe(() => {
      this.success = true;
      this.form = { name: '', email: '', phone: '', message: '' };
      this.selectedFile = null;
      this.previewUrl = null;
      setTimeout(() => this.success = false, 4000);
    });
  }
}
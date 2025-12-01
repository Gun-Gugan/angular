import { Component } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { SHARED_IMPORTS } from '../../shared/ionic-imports';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class HomePage {
  form = { name: '', email: '', phone: '', message: '' };
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  success = false;

  constructor(private service: ApplicationService) {}

  onFileSelected(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  submit() {
    const fd = new FormData();
    ['name', 'email', 'phone', 'message'].forEach(key =>
      fd.append(key, this.form[key as keyof typeof this.form] as string)
    );
    if (this.selectedFile) fd.append('image', this.selectedFile);

    this.service.submit(fd).subscribe(() => {
      this.success = true;
      this.form = { name: '', email: '', phone: '', message: '' };
      this.selectedFile = null;
      this.previewUrl = null;
      setTimeout(() => this.success = false, 4000);
    });
  }
}
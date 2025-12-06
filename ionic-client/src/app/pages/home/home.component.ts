import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';
import { ImageModalComponent } from '../../model/model.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class HomePage implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  currentStep = 1;
  isSubmitting = false;

  previewUrls: string[] = [];
  selectedFiles: File[] = [];

  appForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });

  constructor(
    private service: ApplicationService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.requestPermissionsAndNotify();
  }

  // ==================== NAVIGATION ====================
  nextStep() {
    if (this.appForm.invalid) {
      this.appForm.markAllAsTouched();
      return;
    }
    this.currentStep = 2;
  }

  // ==================== IMAGE HANDLING ====================
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    Array.from(input.files).forEach(file => {
      this.selectedFiles.push(file);
      this.loadPreview(file);
    });

    // Reset input so same file can be selected again
    input.value = '';
  }

  private loadPreview(file: File | Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrls = [...this.previewUrls, reader.result as string];
    };
    reader.readAsDataURL(file);
  }

  async takePhoto() {
    if (Capacitor.getPlatform() === 'web') {
      this.fileInput.nativeElement.click();
      return;
    }

    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      if (image.dataUrl) {
        const blob = this.dataURLtoBlob(image.dataUrl);
        const file = new File([blob], `photo-${Date.now()}.jpeg`, { type: 'image/jpeg' });

        this.selectedFiles = [...this.selectedFiles, file];
        this.previewUrls = [...this.previewUrls, image.dataUrl];
      }
    } catch (err: any) {
      if (err.message !== 'User cancelled photos app') {
        alert('Camera error: ' + err.message);
      }
    }
  }

  removeImage(index: number, event?: Event) {
    event?.stopPropagation(); 

    this.previewUrls = this.previewUrls.filter((_, i) => i !== index);
    this.selectedFiles = this.selectedFiles.filter((_, i) => i !== index);
  }

  async openImageModal(img: string) {
    const modal = await this.modalCtrl.create({
      component: ImageModalComponent,
      componentProps: { imageSource: img },
      cssClass: 'full-screen-modal',
      backdropDismiss: true,
    });
    await modal.present();
  }

  // ==================== SUBMIT ====================
  async submit() {
    if (this.selectedFiles.length === 0) {
      alert('Please add at least one photo!');
      return;
    }

    if (this.isSubmitting) return;
    this.isSubmitting = true;

    const fd = new FormData();
    fd.append('name', this.appForm.get('name')?.value?.trim() || '');
    fd.append('email', this.appForm.get('email')?.value?.trim() || '');
    fd.append('phone', this.appForm.get('phone')?.value?.trim() || '');
    fd.append('message', this.appForm.get('message')?.value?.trim() || '');

    this.selectedFiles.forEach(file => {
      fd.append('images[]', file, file.name);
    });

    try {
      await this.service.submit(fd).toPromise();
      this.currentStep = 3;

      if (Capacitor.getPlatform() !== 'web') {
        await LocalNotifications.schedule({
          notifications: [{
            id: 999,
            title: 'Application Submitted!',
            body: 'Thank you! We received your application.',
            schedule: { at: new Date(Date.now() + 1000) },
          }],
        });
      }
    } catch (err: any) {
      console.error('Submit error:', err);
      alert('Submission failed: ' + (err.error?.message || err.message || 'Unknown error'));
    } finally {
      this.isSubmitting = false;
    }
  }

  resetForm() {
    this.appForm.reset();
    this.previewUrls = [];
    this.selectedFiles = [];
    this.currentStep = 1;
  }

  // ==================== UTILS ====================
  private dataURLtoBlob(dataUrl: string): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  }

  private async requestPermissionsAndNotify() {
    if (Capacitor.getPlatform() === 'web') return;

    try {
      // Notifications
      const notifPerm = await LocalNotifications.requestPermissions();
      if (notifPerm.display === 'granted') {
        await LocalNotifications.schedule({
          notifications: [{
            id: 1,
            title: 'Welcome!',
            body: 'Your application form is ready',
            schedule: { at: new Date(Date.now() + 2000) },
          }],
        });
      }

      // Camera
      const camPerm = await Camera.checkPermissions();
      if (camPerm.camera !== 'granted') {
        await Camera.requestPermissions({ permissions: ['camera'] });
      }
    } catch (err) {
      console.log('Permission setup failed:', err);
    }
  }
}
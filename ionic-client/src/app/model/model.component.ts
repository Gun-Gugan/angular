import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PinchZoomDirective } from '../directives/pinch-zoom.directive.ts/pinch-zoom.directive.ts.component';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  templateUrl: './model.component.html',   // ← Fixed name
  styleUrls: ['./model.component.scss'],
  imports: [IonicModule, CommonModule, PinchZoomDirective],
})
export class ImageModalComponent {
  @Input() imageSource!: string;
  preview: string = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.preview = this.sanitizeImageUrl(this.imageSource);
  }

  // Properly handle both full URL, relative URL, and base64
  sanitizeImageUrl(src: string): string {
    if (!src) return '';

    // If it's already base64 or full https:// URL
    if (src.startsWith('data:image') || src.startsWith('http')) {
      return src;
    }

    // If it's a relative path from your backend (e.g., "/uploads/photo.jpg")
    return 'http://localhost:5000' + src;
  }

  closeModal() {
    this.modalCtrl.dismiss({ base64: this.preview });
  }
}
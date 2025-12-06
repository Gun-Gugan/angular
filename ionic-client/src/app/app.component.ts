// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

// ADD THESE IMPORTS
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  chevronForwardOutline,
  cameraOutline,
  imageOutline,
  trashOutline,
  expandOutline,
  checkmarkCircle,
  closeOutline,
  addCircleOutline,
  eyeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
  standalone: true
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    // REGISTER ALL YOUR ICONS HERE — DO THIS ONCE!
    addIcons({
      'chevron-back-outline': chevronBackOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'camera-outline': cameraOutline,
      'trash-outline': trashOutline,
      'image-outline': imageOutline,
      'expand-outline': expandOutline,
      'checkmark-circle': checkmarkCircle,
      'close-outline': closeOutline,
      'add-circle-outline': addCircleOutline,
      'eye-outline': eyeOutline,
    });
  }
}
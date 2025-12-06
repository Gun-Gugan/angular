import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonImg,
  IonNote,
  IonList,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonButtons,
  IonBackButton,
  IonFab,           
  IonFabButton,
  IonIcon
} from '@ionic/angular/standalone';

// Export everything in one clean object
export const SHARED_IMPORTS = [
  CommonModule,
  FormsModule,
  RouterLink,

  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonImg,
  IonNote,
  IonList,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonButtons,
  IonBackButton,
  IonFab,
  IonFabButton,
  IonIcon
] as const;
import { ApplicationRef, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

export const appConfig = {
  providers: [
    importProvidersFrom(AppRoutingModule),
    provideHttpClient() 
  ]
};
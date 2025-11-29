import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, UserFormComponent, AdminPanelComponent],
  imports: [BrowserModule,FormsModule, HttpClientModule, AppRoutingModule, SharedModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  { path: '', loadComponent: () => import('./user-form/user-form.component').then(m => m.UserFormComponent) },
  { path: 'admin', loadComponent: () => import('./admin-panel/admin-panel.component').then(m => m.AdminPanelComponent) },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
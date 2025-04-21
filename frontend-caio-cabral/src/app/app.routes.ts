import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  {
    path: 'create',
    loadComponent: () => import('./components/create/create.component').then(m => m.CreateComponent)
  },
  {
    path: 'delete',
    loadComponent: () => import('./components/delete/delete.component').then(m => m.DeleteComponent)
  },
  {
    path: 'update',
    loadComponent: () => import('./components/update/update.component').then(m => m.UpdateComponent)
  },
  {
    path: 'view',
    loadComponent: () => import('./components/view/view.component').then(m => m.ViewComponent)
  },
  {
    path: 'view-all',
    loadComponent: () => import('./components/view-all/view-all.component').then(m => m.ViewAllComponent)
  },
];

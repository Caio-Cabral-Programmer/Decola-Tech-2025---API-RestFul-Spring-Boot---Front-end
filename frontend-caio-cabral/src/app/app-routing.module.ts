import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
// Removendo imports diretos de componentes standalone
// import { CreateComponent } from './components/create/create.component';
// import { DeleteComponent } from './components/delete/delete.component';
// import { UpdateComponent } from './components/update/update.component';
// import { ViewComponent } from './components/view/view.component';
// import { ViewAllComponent } from './components/view-all/view-all.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
    // Usando loadComponent para componentes standalone

    {
      path: 'home',
      loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
    },
    {
      path: 'menu',
      loadComponent: () => import('./components/menu/menu.component').then(m => m.MenuComponent)
    },
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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

@NgModule({   // @NgModule é um decorador que marca esta classe como um módulo Angular
  imports: [RouterModule.forRoot(routes)],  // configura o RouterModule com as rotas que definimos acima.
  exports: [RouterModule] // disponibiliza o RouterModule para outros módulos que importarem este
})
export class AppRoutingModule { } // export class AppRoutingModule { } define a classe do módulo que pode ser importada em outros lugares


/* ## Diferenças entre app.routes.ts e app-routing.module.ts
Notei que você tem dois arquivos de roteamento no seu projeto:

- app.routes.ts (que vimos anteriormente)
- app-routing.module.ts (que estamos vendo agora)
Isso acontece porque o Angular 19.2 (que você está usando) suporta duas abordagens diferentes para configurar rotas:

1. Abordagem baseada em módulo (app-routing.module.ts): É a abordagem tradicional, que usa NgModule.
2. Abordagem standalone (app.routes.ts): É a abordagem mais moderna, que não precisa de NgModule.
Parece que seu projeto está em transição entre essas duas abordagens, o que é comum quando atualizamos projetos Angular. Você provavelmente está migrando da abordagem baseada em módulo para a abordagem standalone, que é mais simples e moderna. */
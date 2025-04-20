import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { CreateComponent } from './components/create/create.component';
import { DeleteComponent } from './components/delete/delete.component';
import { UpdateComponent } from './components/update/update.component';
import { ViewComponent } from './components/view/view.component';
import { ViewAllComponent } from './components/view-all/view-all.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'create', component: CreateComponent },
  { path: 'delete', component: DeleteComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'view', component: ViewComponent },
  { path: 'view-all', component: ViewAllComponent },
  { path: '**', redirectTo: 'home' } // Rota curinga para páginas não encontradas
];

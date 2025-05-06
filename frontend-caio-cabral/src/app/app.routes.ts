import { Routes } from '@angular/router';  // Importa a classe Routes do pacote de roteamento do Angular, que permite definir as rotas do aplicativo
import { HomeComponent } from './components/home/home.component';  // Importa o componente da página inicial do aplicativo
import { MenuComponent } from './components/menu/menu.component';  // Importa o componente do menu do aplicativo

export const routes: Routes = [  // Cria e exporta uma constante chamada 'routes' que contém todas as rotas do aplicativo
  { path: '', redirectTo: 'home', pathMatch: 'full' },  // Redireciona o caminho vazio (raiz do site) para a página 'home', usando correspondência completa do caminho
  { path: 'home', component: HomeComponent },  // Define que quando o usuário acessar '/home', o Angular mostrará o componente HomeComponent
  { path: 'menu', component: MenuComponent },  // Define que quando o usuário acessar '/menu', o Angular mostrará o componente MenuComponent
  {
    path: 'create',  // Define o caminho 'create' para criar novos registros
    loadComponent: () => import('./components/create/create.component').then(m => m.CreateComponent)  // Usa carregamento preguiçoso (lazy loading) para carregar o componente apenas quando necessário
  },
  {
    path: 'delete',  // Define o caminho 'delete' para excluir registros
    loadComponent: () => import('./components/delete/delete.component').then(m => m.DeleteComponent)  // Carrega o componente de exclusão apenas quando o usuário acessar esta rota
  },
  {
    path: 'update',  // Define o caminho 'update' para atualizar registros existentes
    loadComponent: () => import('./components/update/update.component').then(m => m.UpdateComponent)  // Carrega o componente de atualização apenas quando o usuário acessar esta rota
  },
  {
    path: 'view',  // Define o caminho 'view' para visualizar um registro específico
    loadComponent: () => import('./components/view/view.component').then(m => m.ViewComponent)  // Carrega o componente de visualização apenas quando o usuário acessar esta rota
  },
  {
    path: 'view-all',  // Define o caminho 'view-all' para visualizar todos os registros
    loadComponent: () => import('./components/view-all/view-all.component').then(m => m.ViewAllComponent)  // Carrega o componente de visualização de todos apenas quando o usuário acessar esta rota
  },
];  // Fecha a definição do array de rotas

/* ## Por que este arquivo é importante?
Este arquivo é super importante porque:

1. Navegação : Permite que os usuários naveguem entre diferentes páginas do seu aplicativo sem recarregar a página inteira.
2. Organização : Mantém seu código organizado, separando cada funcionalidade em componentes diferentes.
3. Carregamento Eficiente : Com o lazy loading (carregamento preguiçoso), seu aplicativo carrega mais rápido porque só baixa o código necessário quando o usuário precisa dele.
4. Experiência do Usuário : Cria uma experiência mais fluida e rápida para quem usa seu aplicativo.
## Como isso funciona no seu projeto?
No seu projeto, você tem um aplicativo para gerenciar contas bancárias. Este arquivo de rotas permite que os usuários naveguem entre:

- A página inicial (home)
- O menu principal
- A página para criar uma nova conta
- A página para excluir uma conta
- A página para atualizar informações de uma conta
- A página para visualizar detalhes de uma conta específica
- A página para visualizar todas as contas
Quando o usuário clica em um botão no seu aplicativo (como os botões que vi no seu componente de menu), o Angular usa estas rotas para saber qual componente deve mostrar na tela.

Por exemplo, quando alguém clica no botão "Criar" no menu, o Angular olha para este arquivo de rotas, vê que o caminho 'create' deve carregar o CreateComponent, e então mostra esse componente na tela.

É como se fosse um mapa que guia os usuários pelo seu aplicativo! */
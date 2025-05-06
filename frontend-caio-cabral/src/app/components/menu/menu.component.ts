import { Component } from '@angular/core';                // Importa a classe Component do Angular, necessária para criar componentes
import { Router } from '@angular/router';                 // Importa o Router para permitir navegação entre diferentes páginas do aplicativo

@Component({                                              // Decorador que marca esta classe como um componente Angular
  standalone: true,                                       // Indica que este é um componente standalone (não precisa de um módulo)
  selector: 'app-menu',                                   // Define o nome da tag HTML que será usada para inserir este componente (como <app-menu></app-menu>)
  templateUrl: './menu.component.html',                   // Caminho para o arquivo HTML que define a estrutura visual deste componente
  styleUrls: ['./menu.component.css']                     // Caminho para o arquivo CSS que define os estilos deste componente
})
export class MenuComponent {                              // Define a classe do componente que será exportada
  constructor(private router: Router) {}                  // Construtor da classe que recebe o serviço Router para navegação

  goToCreate() {                                          // Método para navegar para a página de criação de usuário
    console.log('Navegando para /create');                // Mostra uma mensagem no console (útil para depuração)
    this.router.navigateByUrl('/create');                 // Usa o Router para navegar para a rota '/create'
  }

  goToDelete() {                                          // Método para navegar para a página de exclusão de usuário
    this.router.navigateByUrl('/delete');                 // Usa o Router para navegar para a rota '/delete'
  }

  goToUpdate() {                                          // Método para navegar para a página de atualização de usuário
    this.router.navigateByUrl('/update');                 // Usa o Router para navegar para a rota '/update'
  }

  goToView() {                                            // Método para navegar para a página de visualização de um usuário específico
    this.router.navigateByUrl('/view');                   // Usa o Router para navegar para a rota '/view'
  }

  goToViewAll() {                                         // Método para navegar para a página de visualização de todos os usuários
    this.router.navigateByUrl('/view-all');               // Usa o Router para navegar para a rota '/view-all'
  }

  goToHome() {                                            // Método para navegar para a página inicial
    this.router.navigateByUrl('/home');                   // Usa o Router para navegar para a rota '/home'
  }
}

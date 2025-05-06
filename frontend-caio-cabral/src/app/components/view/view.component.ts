import { Component } from '@angular/core';  // Importa a classe Component do Angular, que é necessária para criar componentes
import { CommonModule } from '@angular/common';  // Importa o módulo comum que contém diretivas básicas como ngIf e ngFor
import { FormsModule } from '@angular/forms';  // Importa o módulo de formulários para usar recursos como ngModel
import { ApiService } from '../../services/api.service';  // Importa o serviço que se comunica com o backend
import { Router } from '@angular/router';  // Importa o Router para permitir navegação entre páginas
import { User } from '../../models/user.model';  // Importa o modelo de usuário que define a estrutura dos dados
import { CurrencyPipe } from '@angular/common'; // Importa o pipe de moeda para formatar valores monetários

@Component({  // Decorador que marca esta classe como um componente Angular
  selector: 'app-view',  // Define o nome da tag HTML para este componente (<app-view></app-view>)
  standalone: true,  // Indica que este é um componente standalone (não precisa de um módulo)
  imports: [  // Lista de módulos e componentes que este componente precisa usar
    CommonModule,  // Módulo com diretivas básicas como ngIf e ngFor
    FormsModule,    // Para ngModel  // Módulo para trabalhar com formulários e ligação bidirecional
    CurrencyPipe    // Para o pipe currency  // Pipe para formatar valores como moeda
  ],
  templateUrl: './view.component.html',  // Caminho para o arquivo HTML que define a estrutura visual
  styleUrls: ['./view.component.css']  // Caminho para o arquivo CSS que define os estilos
})
export class ViewComponent {  // Define a classe do componente que será exportada
  userId: number | null = null;  // Propriedade para armazenar o ID do usuário que será buscado
  user: User | null = null;  // Propriedade para armazenar os dados do usuário encontrado
  searched: boolean = false;  // Propriedade para controlar se uma busca já foi realizada

  constructor(  // Construtor da classe, chamado quando o componente é criado
    private apiService: ApiService,  // Injeta o serviço API para comunicação com o backend
    private router: Router  // Injeta o serviço Router para navegação entre páginas
  ) {}

  searchUser() {  // Método que busca um usuário pelo ID
    if (this.userId) {  // Verifica se o ID do usuário foi fornecido
      this.apiService.getUser(this.userId).subscribe({  // Chama o método getUser do serviço API e se inscreve para receber a resposta
        next: (user) => {  // Função chamada quando os dados são recebidos com sucesso
          this.user = user;  // Armazena o usuário recebido
          this.searched = true;  // Marca que uma busca foi realizada
        },
        error: (error) => {  // Função chamada quando ocorre um erro
          console.error('Erro ao buscar usuário:', error);  // Mostra o erro no console
          this.user = null;  // Define o usuário como null (não encontrado)
          this.searched = true;  // Marca que uma busca foi realizada, mesmo com erro
        }
      });
    }
  }

  goToMenu() {  // Método para voltar para a página de menu principal
    this.router.navigate(['/menu']);  // Usa o Router para navegar para a rota '/menu'
  }
}
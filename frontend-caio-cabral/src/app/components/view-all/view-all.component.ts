import { Component, OnInit } from '@angular/core';  // Importa as classes Component e OnInit do Angular, necessárias para criar componentes e inicializá-los
import { CommonModule } from '@angular/common';  // Importa o módulo comum que contém diretivas básicas como ngIf e ngFor para usar no template
import { Router } from '@angular/router';  // Importa o Router para permitir navegação entre diferentes páginas do aplicativo
import { ApiService } from '../../services/api.service';  // Importa o serviço que se comunica com o backend para buscar dados
import { User } from '../../models/user.model';  // Importa o modelo de usuário que define a estrutura dos dados

@Component({  // Decorador que marca esta classe como um componente Angular
  selector: 'app-view-all',  // Define o nome da tag HTML que será usada para inserir este componente (como <app-view-all></app-view-all>)
  standalone: true,  // Indica que este é um componente standalone (não precisa de um módulo)
  imports: [CommonModule],  // Lista de módulos que este componente precisa usar (CommonModule para ngIf, ngFor, etc.)
  templateUrl: './view-all.component.html',  // Caminho para o arquivo HTML que define a estrutura visual deste componente
  styleUrls: ['./view-all.component.css']  // Caminho para o arquivo CSS que define os estilos deste componente
})
export class ViewAllComponent implements OnInit {  // Define a classe do componente e implementa a interface OnInit
  users: User[] = [];  // Cria uma propriedade para armazenar a lista de usuários, inicialmente vazia
  loading: boolean = false;  // Cria uma propriedade para controlar se os dados estão sendo carregados

  constructor(  // Construtor da classe, chamado quando o componente é criado
    private apiService: ApiService,  // Injeta o serviço API para comunicação com o backend
    private router: Router  // Injeta o serviço Router para navegação entre páginas
  ) { }

  ngOnInit(): void {  // Método que é executado quando o componente é inicializado
    this.loadUsers();  // Chama o método para carregar a lista de usuários
  }

  loadUsers(): void {  // Método que busca todos os usuários do servidor
    this.loading = true;  // Define loading como true para mostrar um indicador de carregamento
    this.apiService.getUsers().subscribe({  // Chama o método getUsers do serviço API e se inscreve para receber a resposta
      next: (users: User[]) => {  // Função chamada quando os dados são recebidos com sucesso
        this.users = users;  // Armazena a lista de usuários recebida
        this.loading = false;  // Define loading como false para esconder o indicador de carregamento
      },
      error: (error: any) => {  // Função chamada quando ocorre um erro
        console.error('Erro ao carregar usuários', error);  // Mostra o erro no console
        this.loading = false;  // Define loading como false para esconder o indicador de carregamento
      }
    });
  }

  navigateToView(id: number): void {  // Método para navegar para a página de visualização de um usuário específico
    this.router.navigate(['/view', id]);  // Usa o Router para navegar para a rota '/view/:id'
  }

  navigateToUpdate(id: number): void {  // Método para navegar para a página de atualização de um usuário específico
    this.router.navigate(['/update', id]);  // Usa o Router para navegar para a rota '/update/:id'
  }

  navigateToDelete(id: number): void {  // Método para navegar para a página de exclusão de um usuário específico
    this.router.navigate(['/delete', id]);  // Usa o Router para navegar para a rota '/delete/:id'
  }

  goToMenu(): void {  // Método para voltar para a página de menu principal
    this.router.navigate(['/menu']);  // Usa o Router para navegar para a rota '/menu'
  }
}
import { Component, OnInit } from '@angular/core';                          // Importa as classes Component e OnInit do Angular, necessárias para criar componentes
import { CommonModule } from '@angular/common';                             // Importa o módulo comum que contém diretivas básicas como ngIf e ngFor
import { FormsModule } from '@angular/forms';                               // Importa o módulo de formulários para usar recursos como ngModel
import { ActivatedRoute, Router } from '@angular/router';                   // Importa classes para lidar com rotas e navegação entre páginas
import { ApiService } from '../../services/api.service';                    // Importa o serviço que se comunica com o backend
import { User } from '../../models/user.model';                             // Importa o modelo de usuário que define a estrutura dos dados

@Component({                                                                // Decorador que marca esta classe como um componente Angular
  selector: 'app-delete',                                                   // Define o nome da tag HTML para este componente (<app-delete></app-delete>)
  standalone: true,                                                         // Indica que este é um componente standalone (não precisa de um módulo)
  imports: [CommonModule, FormsModule],                                     // Lista de módulos que este componente precisa usar
  templateUrl: './delete.component.html',                                   // Caminho para o arquivo HTML que define a estrutura visual
  styleUrls: ['./delete.component.css']                                     // Caminho para o arquivo CSS que define os estilos
})
export class DeleteComponent implements OnInit {                            // Define a classe do componente que implementa a interface OnInit
  userId!: number;                                                          // Propriedade para armazenar o ID do usuário que será excluído (! indica inicialização posterior)
  user: User  | null = null;                                                // Propriedade para armazenar os dados do usuário encontrado
  searched: boolean = false;                                                // Propriedade para controlar se uma busca já foi realizada
  showConfirmation: boolean = false;                                        // Propriedade para controlar se a confirmação de exclusão deve ser mostrada
  successMessage: string = '';                                              // Propriedade para armazenar mensagens de sucesso
  errorMessage: string = '';  // Nova propriedade para mensagens de erro    // Propriedade para armazenar mensagens de erro

  constructor(                                                              // Construtor da classe, chamado quando o componente é criado
    private route: ActivatedRoute,                                          // Injeta o serviço ActivatedRoute para acessar parâmetros da URL
    private apiService: ApiService,                                         // Injeta o serviço API para comunicação com o backend
    private router: Router                                                  // Injeta o serviço Router para navegação entre páginas
  ) { }                                                                     // Corpo vazio do construtor, as injeções são feitas automaticamente

  ngOnInit(): void { // FIXME: parece desnecessário.                        // Método do ciclo de vida executado quando o componente é inicializado
    this.route.params.subscribe(params => {                                 // Se inscreve para receber os parâmetros da URL
      if (params['id']) {                                                   // Verifica se existe um parâmetro 'id' na URL
        this.userId = +params['id'];                                        // Converte o parâmetro 'id' para número e armazena em userId
        this.loadUser();                                                    // Chama o método para carregar os dados do usuário
      }
    });
  }

  searchUser(): void {                                                      // Método que busca um usuário pelo ID
    if (this.userId) {                                                      // Verifica se o ID do usuário foi fornecido
      this.loadUser();                                                      // Chama o método para carregar os dados do usuário
      this.searched = true;                                                 // Marca que uma busca foi realizada
      // Limpa mensagens anteriores quando faz nova busca                   // Comentário explicando as duas linhas abaixo
      this.errorMessage = '';                                               // Limpa a mensagem de erro
      this.successMessage = '';                                             // Limpa a mensagem de sucesso
    }
  }

  loadUser(): void {                                                        // Método que carrega os dados do usuário da API
    this.apiService.getUser(this.userId).subscribe({                        // Chama o método getUser do serviço API e se inscreve para receber a resposta
      next: (user: User) => {                                               // Função chamada quando os dados são recebidos com sucesso
        this.user = user;                                                   // Armazena o usuário recebido
        console.log('Usuário carregado com sucesso!');                      // Mostra mensagem de sucesso no console
        this.showConfirmation = false;                                      // Esconde a confirmação de exclusão
      },
      error: (error: any) => {                                              // Função chamada quando ocorre um erro
        console.error('Erro ao carregar usuário!', error);                  // Mostra o erro no console
        this.user = null;                                                   // Define o usuário como null (não encontrado)
        this.searched = true;                                               // Marca que uma busca foi realizada, mesmo com erro
      }
    });
  }

  showDeleteConfirmation(): void {                                          // Método que mostra a confirmação de exclusão
    // Verifica se o usuário tem ID 1 antes de mostrar a confirmação        // Comentário explicando a verificação abaixo
    if (this.userId === 1) {                                                // Verifica se o ID do usuário é 1 (protegido contra exclusão)
      this.errorMessage = 'O usuário com ID 1 não pode ser excluído! Os demais podem ser excluídos.'; // Define uma mensagem de erro
      return; // Sai da função sem mostrar a confirmação                    // Retorna da função sem continuar
    }
    
    this.showConfirmation = true;                                           // Mostra a confirmação de exclusão
  }

  cancelDelete(): void {                                                    // Método que cancela a exclusão
    this.showConfirmation = false;                                          // Esconde a confirmação de exclusão
  }

  confirmDelete(): void {                                                   // Método que confirma a exclusão do usuário
    // Verificação adicional de segurança antes de excluir                  // Comentário explicando a verificação abaixo
    if (this.userId === 1) { // FIXME: parece que é desnecessário.          // Verifica novamente se o ID do usuário é 1 (proteção dupla)
      this.errorMessage = 'O usuário com ID 1 não pode ser excluído! Os demais podem ser excluídos.'; // Define uma mensagem de erro
      this.showConfirmation = false;                                        // Esconde a confirmação de exclusão
      return;                                                               // Retorna da função sem continuar
    }
    
    this.apiService.deleteUser(this.userId).subscribe({                     // Chama o método deleteUser do serviço API e se inscreve para receber a resposta
      next: () => {                                                         // Função chamada quando a exclusão é bem-sucedida
        console.log('Usuário excluído com sucesso');                        // Mostra mensagem de sucesso no console
        this.successMessage = 'Usuário excluído com sucesso!';              // Define uma mensagem de sucesso para o usuário
        this.user = null as any;                                            // Define o usuário como null (foi excluído)
        this.showConfirmation = false;                                      // Esconde a confirmação de exclusão
        setTimeout(() => {                                                  // Define um temporizador para redirecionar após 3 segundos
          this.router.navigate(['/view-all']);                              // Navega para a página de visualização de todos os usuários
        }, 2000);
      },
      error: (error: any) => {                                              // Função chamada quando ocorre um erro
        console.error('Erro ao excluir usuário', error);                    // Mostra o erro no console
        this.errorMessage = 'Erro ao excluir usuário. Tente novamente mais tarde.'; // Define uma mensagem de erro para o usuário
        this.showConfirmation = false;                                      // Esconde a confirmação de exclusão
      }
    });
  }
  // FIXME: parece que é desnecessário, pois não é usado em nenhum lugar.
  cancel(): void {                                                          // Método que cancela a operação e volta para a lista de usuários
    this.router.navigate(['/view-all']);                                    // Navega para a página de visualização de todos os usuários
  }

  goToMenu(): void {                                                        // Método para voltar para o menu principal
    this.router.navigate(['/menu']);                                        // Navega para a página de menu
  }
}

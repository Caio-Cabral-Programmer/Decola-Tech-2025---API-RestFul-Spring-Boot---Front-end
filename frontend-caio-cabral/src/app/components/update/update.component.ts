import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,         // Para ngModel
    ReactiveFormsModule  // Para formGroup
  ],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  userId: number | null = null;
  user: User | null = null;
  userForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';  // Nova propriedade para mensagens de erro
  searched: boolean = false;
  accountId: number | null = null;  // Novo campo para armazenar o ID da conta
  cardId: number | null = null;     // Novo campo para armazenar o ID do cartão

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    // Inicializa o formulário com a estrutura aninhada
    this.userForm = this.fb.group({
      id: [null],  // Campo para o ID do usuário
      name: ['', Validators.required],
      account: this.fb.group({
        id: [null],  // Campo para o ID da conta
        number: ['', Validators.required],
        agency: ['', Validators.required],
        balance: [0, Validators.required],
        limit: [0, Validators.required]
      }),
      card: this.fb.group({
        id: [null],  // Campo para o ID do cartão
        number: ['', Validators.required],
        limit: [0, Validators.required]
      })
    });
  }

  ngOnInit(): void {}

  /**
   * Busca um usuário pelo ID e preenche o formulário com seus dados
   * Esta função busca o usuário da API e adapta os dados para o formato do formulário
   */
  searchUser(): void {
    if (this.userId) {
      // Limpa mensagens anteriores quando faz nova busca
      this.errorMessage = '';
      this.successMessage = '';
      
      this.apiService.getUser(this.userId).subscribe({
        next: (user) => {
          this.user = user;
          
          // Armazena os IDs em variáveis separadas para uso posterior
          this.accountId = user.account?.id || null;
          this.cardId = user.card?.id || null;
          
          // Mapeia os dados do usuário para a nova estrutura do formulário
          // Aqui estamos assumindo que a API retorna um objeto com a estrutura antiga
          // e estamos convertendo para a estrutura que nosso formulário espera
          const formattedUser = {
            id: user.id || this.userId,  // Usa o ID do usuário
            name: user.name || '',
            account: {
              id: user.account?.id || null,  // Usa o ID da conta
              number: user.account?.number || '',
              agency: user.account?.agency || '',
              balance: user.account?.balance || 0,
              limit: user.account?.limit || 0
            },
            card: {
              id: user.card?.id || null,  // Usa o ID do cartão
              number: user.card?.number || '',
              limit: user.card?.limit || 0
            }
          };
          
          this.userForm.patchValue(formattedUser);

          this.searched = true;
        },
        error: (error) => {
          console.error('Erro ao buscar usuário:', error);
          this.user = null;
          this.searched = true;
        }
      });
    }
  }

  /**
   * Envia o formulário para atualizar o usuário
   * Esta função pega os dados do formulário e os envia para a API no formato correto
   */
  onSubmit(): void {
    if (this.userForm.valid && this.userId) {
      // Verifica se o usuário tem ID 1 antes de permitir a atualização
      if (this.userId === 1) {
        this.errorMessage = 'O usuário com ID 1 não pode ser atualizado! Os demais podem ser atualizados.';
        return; // Sai da função sem fazer a atualização
      }
      
      const formValue = this.userForm.value;
      
      // Aqui abaixo estamos criando um objeto User com a estrutura correta com todos os IDs para que o JSON enviado para API contenha todos os IDs para que o update ocorra com sucesso. O formulário não inclue os IDs, por isso precisamos incluí-los manualmente.
      // O que estava acontecendo: O ID do userToUpdate da API estava indo como NULL (sendo portanto, diferente do ID do usuário do Banco de dados) e os números da conta e do cartão estavam acusando como se já existissem no banco de dados.
      const updatedUser: User = {
        id: this.userId,  // Inclue o ID do usuário
        name: formValue.name,
        account: {
          id: formValue.account.id || this.accountId,  // Inclue o ID da conta
          number: formValue.account.number,
          agency: formValue.account.agency,
          balance: formValue.account.balance,
          limit: formValue.account.limit
        },
        card: {
          id: formValue.card.id || this.cardId,  // Inclue o ID do cartão
          number: formValue.card.number,
          limit: formValue.card.limit
        }
      };
      
      this.apiService.updateUser(this.userId, updatedUser).subscribe({
        next: (response) => {
          console.log('Usuário atualizado com sucesso', response);
          this.successMessage = 'Usuário atualizado com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/view-all']);
          }, 2000);
        },
        error: (error) => {
          console.error('Erro ao atualizar usuário:', error);
          
          // Verifica o tipo de erro baseado na resposta da API
          if (error.error && typeof error.error === 'string') {
            // Verifica se a mensagem de erro contém informações sobre conta ou cartão duplicados
            if (error.error.includes('conta') || error.error.toLowerCase().includes('account')) {
              this.errorMessage = 'Número de conta já existe!';
            } else if (error.error.includes('cartão') || error.error.toLowerCase().includes('card')) {
              this.errorMessage = 'Número de cartão já existe!';
            } else {
              this.errorMessage = 'Erro ao atualizar usuário. Tente novamente mais tarde.';
            }
          } else {
            // Tratamento genérico para outros tipos de erro
            this.errorMessage = 'Erro ao atualizar usuário. Tente novamente mais tarde.';
          }
        }
      });
    }
  }

  /**
   * Navega para o menu principal
   */
  goToMenu(): void {
    this.router.navigate(['/menu']);
  }
}

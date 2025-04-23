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
  searched: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    // Inicializa o formulário com a estrutura aninhada
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      account: this.fb.group({
        number: ['', Validators.required],
        agency: ['', Validators.required],
        balance: [0, Validators.required],
        limit: [0, Validators.required]
      }),
      card: this.fb.group({
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
      this.apiService.getUser(this.userId).subscribe({
        next: (user) => {
          this.user = user;
          
          // Mapeia os dados do usuário para a nova estrutura do formulário
          // Aqui estamos assumindo que a API retorna um objeto com a estrutura antiga
          // e estamos convertendo para a estrutura que nosso formulário espera
          const formattedUser = {
            name: user.name || '',
            account: {
              number: user.account?.number || '',
              agency: user.account?.agency || '',
              balance: user.account?.balance || 0,
              limit: user.account?.limit || 0
            },
            card: {
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
      const formValue = this.userForm.value;
      
      // Mapeia os dados do formulário para a estrutura esperada pela API
      // Aqui estamos criando um objeto User com a estrutura correta
      const updatedUser: User = {
        name: formValue.name,
        account: {
          number: formValue.account.number,
          agency: formValue.account.agency,
          balance: formValue.account.balance,
          limit: formValue.account.limit
        },
        card: {
          number: formValue.card.number,
          limit: formValue.card.limit
        }
      };
      
      this.apiService.updateUser(this.userId, updatedUser).subscribe({
        next: (response) => {
          this.successMessage = 'Usuário Atualizado com Sucesso!';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          console.error('Erro ao atualizar usuário:', error);
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

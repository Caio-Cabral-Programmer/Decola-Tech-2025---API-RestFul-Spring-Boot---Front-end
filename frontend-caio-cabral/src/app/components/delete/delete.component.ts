import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  userId!: number;
  user: User  | null = null;
  searched: boolean = false;
  showConfirmation: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';  // Nova propriedade para mensagens de erro

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userId = +params['id'];
        this.loadUser();
      }
    });
  }

  searchUser(): void {
    if (this.userId) {
      this.loadUser();
      this.searched = true;
      // Limpa mensagens anteriores quando faz nova busca
      this.errorMessage = '';
      this.successMessage = '';
    }
  }

  loadUser(): void {
    this.apiService.getUser(this.userId).subscribe({
      next: (user: User) => {
        this.user = user;
        console.log('Usuário carregado com sucesso!');
        this.showConfirmation = false;
      },
      error: (error: any) => {
        console.error('Erro ao carregar usuário!', error);
        this.user = null;
        this.searched = true;
      }
    });
  }

  showDeleteConfirmation(): void {
    // Verifica se o usuário tem ID 1 antes de mostrar a confirmação
    if (this.userId === 1) {
      this.errorMessage = 'O usuário com ID 1 não pode ser excluído! Os demais podem ser excluídos.';
      return; // Sai da função sem mostrar a confirmação
    }
    
    this.showConfirmation = true;
  }

  cancelDelete(): void {
    this.showConfirmation = false;
  }

  confirmDelete(): void {
    // Verificação adicional de segurança antes de excluir
    if (this.userId === 1) {
      this.errorMessage = 'O usuário com ID 1 não pode ser excluído! Os demais podem ser excluídos.';
      this.showConfirmation = false;
      return;
    }
    
    this.apiService.deleteUser(this.userId).subscribe({
      next: () => {
        console.log('Usuário excluído com sucesso');
        this.successMessage = 'Usuário excluído com sucesso!';
        this.user = null as any;
        this.showConfirmation = false;
        setTimeout(() => {
          this.router.navigate(['/view-all']);
        }, 3000);
      },
      error: (error: any) => {
        console.error('Erro ao excluir usuário', error);
        this.errorMessage = 'Erro ao excluir usuário. Tente novamente mais tarde.';
        this.showConfirmation = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/view-all']);
  }

  goToMenu(): void {
    this.router.navigate(['/menu']);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Adicione esta linha
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // Adicione esta linha para usar ngModel
  ],
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  userId: number | null = null;
  user: User | null = null;
  showConfirmation: boolean = false;
  successMessage: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  searchUser(): void {
    if (this.userId) {
      this.apiService.getUser(this.userId).subscribe({
        next: (user) => {
          this.user = user;
          this.showConfirmation = false;
        },
        error: (error) => {
          console.error('Erro ao buscar usuário:', error);
          this.user = null;
          alert('Usuário não encontrado!');
        }
      });
    }
  }

  showDeleteConfirmation(): void {
    this.showConfirmation = true;
  }

  confirmDelete(): void {
    if (this.user && this.user.id) {
      this.apiService.deleteUser(this.user.id).subscribe({
        next: () => {
          this.successMessage = 'Usuário Deletado com Sucesso!';
          this.user = null;
          this.userId = null;
          this.showConfirmation = false;
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          console.error('Erro ao deletar usuário:', error);
        }
      });
    }
  }

  cancelDelete(): void {
    this.showConfirmation = false;
  }

  goToMenu(): void {
    this.router.navigate(['/menu']);
  }
}

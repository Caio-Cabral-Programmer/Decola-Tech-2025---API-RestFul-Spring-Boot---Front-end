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
  user!: User;
  showConfirmation: boolean = false;
  successMessage: string = '';

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
    }
  }

  loadUser(): void {
    this.apiService.getUser(this.userId).subscribe({
      next: (user: User) => {
        this.user = user;
        this.showConfirmation = false;
      },
      error: (error: any) => {
        console.error('Erro ao carregar usuário', error);
      }
    });
  }

  showDeleteConfirmation(): void {
    this.showConfirmation = true;
  }

  cancelDelete(): void {
    this.showConfirmation = false;
  }

  confirmDelete(): void {
    this.apiService.deleteUser(this.userId).subscribe({
      next: () => {
        console.log('Usuário excluído com sucesso');
        this.successMessage = 'Usuário excluído com sucesso!';
        this.user = null as any;
        this.showConfirmation = false;
        setTimeout(() => {
          this.router.navigate(['/view-all']);
        }, 2000);
      },
      error: (error: any) => {
        console.error('Erro ao excluir usuário', error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/view-all']);
  }

  goToMenu(): void {
    this.router.navigate(['/']);
  }
}

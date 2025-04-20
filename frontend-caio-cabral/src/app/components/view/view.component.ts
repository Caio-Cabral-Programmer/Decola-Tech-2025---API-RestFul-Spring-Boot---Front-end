import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { CurrencyPipe } from '@angular/common'; // Adicione esta linha

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,    // Para ngModel
    CurrencyPipe    // Para o pipe currency
  ],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  userId: number | null = null;
  user: User | null = null;
  searched: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  searchUser() {
    if (this.userId) {
      this.apiService.getUser(this.userId).subscribe({
        next: (user) => {
          this.user = user;
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

  goToMenu() {
    this.router.navigate(['/menu']);
  }
}

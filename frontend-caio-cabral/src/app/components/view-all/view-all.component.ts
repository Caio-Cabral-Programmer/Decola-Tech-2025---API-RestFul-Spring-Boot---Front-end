import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-view-all',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.apiService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Erro ao carregar usuários', error);
        this.loading = false;
      }
    });
  }

  navigateToView(id: number): void {
    this.router.navigate(['/view', id]);
  }

  navigateToUpdate(id: number): void {
    this.router.navigate(['/update', id]);
  }

  navigateToDelete(id: number): void {
    this.router.navigate(['/delete', id]);
  }

  goToMenu(): void {
    this.router.navigate(['/']);
  }
}

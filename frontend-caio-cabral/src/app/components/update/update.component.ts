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
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      numeroConta: ['', Validators.required],
      numeroAgencia: ['', Validators.required],
      saldo: [0, Validators.required],
      limiteConta: [0, Validators.required],
      numeroCartao: ['', Validators.required],
      limiteCartao: [0, Validators.required]
    });
  }

  ngOnInit(): void {}

  searchUser(): void {
    if (this.userId) {
      this.apiService.getUser(this.userId).subscribe({
        next: (user) => {
          this.user = user;
          this.userForm.patchValue(user);
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

  onSubmit(): void {
    if (this.userForm.valid && this.userId) {
      const updatedUser: User = this.userForm.value;
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

  goToMenu(): void {
    this.router.navigate(['/menu']);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-create',
  standalone: true, // Mantenha para Angular 16+
  imports: [
    CommonModule,
    ReactiveFormsModule // ESSE É O IMPORT CRUCIAL PARA RESOLVER O ERRO
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  userForm: FormGroup;
  successMessage: string = '';

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

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      this.apiService.createUser(user).subscribe({
        next: (response) => {
          this.successMessage = 'Usuário Criado com Sucesso!';
          this.userForm.reset();
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          console.error('Erro ao criar usuário:', error);
        }
      });
    }
  }

  goToMenu(): void {
    this.router.navigate(['/menu']);
  }
}

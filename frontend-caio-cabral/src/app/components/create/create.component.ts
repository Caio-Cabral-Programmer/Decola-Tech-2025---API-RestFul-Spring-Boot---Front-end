import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  userForm!: FormGroup;
  successMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      console.log('Evento de rota:', event); // Isso mostrará no console toda a navegação que ocorre na aplicação.
    });
  }

  ngOnInit(): void {
    this.initForm();
    }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      nome: ['', Validators.required],
      numeroConta: ['', Validators.required],
      numeroAgencia: ['', Validators.required],
      saldo: [0, Validators.required],
      limiteConta: [0, Validators.required],
      numeroCartao: ['', Validators.required],
      limiteCartao: [0, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      this.apiService.createUser(user).subscribe({
        next: (response) => {
          console.log('Usuário criado com sucesso', response);
          this.successMessage = 'Usuário criado com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/view-all']);
          }, 2000);
        },
        error: (error) => {
          console.error('Erro ao criar usuário', error);
        }
      });
    } else {
      this.markFormGroupTouched(this.userForm);
    }
  }

  // Helper method to mark all controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/view-all']);
  }

  goToMenu() {
    this.router.navigate(['/menu']);
  }

}


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User, Item } from '../../models/user.model';

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
      name: ['', Validators.required],
      account: this.formBuilder.group({
        number: ['', Validators.required],
        agency: ['', Validators.required],
        balance: [0, Validators.required],
        limit: [0, Validators.required]
      }),
      card: this.formBuilder.group({
        number: ['', Validators.required],
        limit: [0, Validators.required]
      })
    });
  }

  // Método auxiliar para criar um FormGroup para itens (features e news)
  createItemFormGroup(): FormGroup {
    return this.formBuilder.group({
      icon: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Métodos para adicionar novos itens aos arrays
  addFeature(): void {
    const features = this.userForm.get('features') as FormArray;
    features.push(this.createItemFormGroup());
  }

  addNews(): void {
    const news = this.userForm.get('news') as FormArray;
    news.push(this.createItemFormGroup());
  }

  // Métodos para remover itens dos arrays
  removeFeature(index: number): void {
    const features = this.userForm.get('features') as FormArray;
    if (features.length > 1) {
      features.removeAt(index);
    }
  }

  removeNews(index: number): void {
    const news = this.userForm.get('news') as FormArray;
    if (news.length > 1) {
      news.removeAt(index);
    }
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


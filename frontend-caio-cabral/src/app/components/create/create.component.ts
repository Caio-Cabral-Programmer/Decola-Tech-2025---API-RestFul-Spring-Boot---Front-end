import { Component, OnInit } from '@angular/core';                          // Importa as classes Component e OnInit do Angular, necessárias para criar componentes
import { CommonModule } from '@angular/common';                             // Importa o módulo comum que contém diretivas básicas como ngIf e ngFor
import { FormsModule, ReactiveFormsModule } from '@angular/forms';          // Importa módulos para trabalhar com formulários no Angular
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms'; // Importa classes específicas para criar e validar formulários reativos
import { Router } from '@angular/router';                                   // Importa o Router para permitir navegação entre páginas
import { ApiService } from '../../services/api.service';                    // Importa o serviço que se comunica com o backend
import { User } from '../../models/user.model';                             // Importa o modelo de usuário que define a estrutura dos dados

@Component({                                                                // Decorador que marca esta classe como um componente Angular
  selector: 'app-create',                                                   // Define o nome da tag HTML para este componente (<app-create></app-create>)
  standalone: true,                                                         // Indica que este é um componente standalone (não precisa de um módulo)
  imports: [                                                                // Lista de módulos que este componente precisa usar
    CommonModule,                                                           // Módulo com diretivas básicas como ngIf e ngFor
    FormsModule,                                                            // Módulo para trabalhar com formulários baseados em template
    ReactiveFormsModule                                                     // Módulo para trabalhar com formulários reativos
  ],
  templateUrl: './create.component.html',                                   // Caminho para o arquivo HTML que define a estrutura visual
  styleUrls: ['./create.component.css']                                     // Caminho para o arquivo CSS que define os estilos
})
export class CreateComponent implements OnInit {                            // Define a classe do componente que implementa a interface OnInit
  userForm!: FormGroup;                                                     // Propriedade para o formulário reativo (! indica inicialização posterior)
  successMessage: string = '';                                              // Propriedade para armazenar mensagens de sucesso
  errorMessage: string = ''; // Nova propriedade para mensagens de erro     // Propriedade para armazenar mensagens de erro

  constructor(                                                              // Construtor da classe, chamado quando o componente é criado
    private formBuilder: FormBuilder,                                       // Injeta o FormBuilder para criar formulários reativos
    private apiService: ApiService,                                         // Injeta o serviço API para comunicação com o backend
    private router: Router                                                  // Injeta o serviço Router para navegação entre páginas
  ) {
    this.router.events.subscribe(event => {                                 // Se inscreve para receber eventos de navegação do Router
      console.log('Evento de rota:', event); // Isso mostrará no console toda a navegação que ocorre na aplicação. // Mostra no console cada evento de navegação (útil para depuração)
    });
  }

  ngOnInit(): void {                                                        // Método do ciclo de vida executado quando o componente é inicializado
    this.initForm();                                                        // Chama o método para inicializar o formulário
  }

  initForm(): void {                                                        // Método que inicializa o formulário reativo
    this.userForm = this.formBuilder.group({                                // Cria um formulário reativo usando o FormBuilder
      name: ['', Validators.required],                                      // Campo nome com valor inicial vazio e validação de obrigatoriedade
      account: this.formBuilder.group({                                     // Cria um grupo aninhado para os dados da conta
        number: ['', Validators.required],                                  // Campo número da conta com valor inicial vazio e validação de obrigatoriedade
        agency: ['', Validators.required],                                  // Campo agência com valor inicial vazio e validação de obrigatoriedade
        balance: [0, Validators.required],                                  // Campo saldo com valor inicial 0 e validação de obrigatoriedade
        limit: [0, Validators.required]                                     // Campo limite com valor inicial 0 e validação de obrigatoriedade
      }),
      card: this.formBuilder.group({                                        // Cria um grupo aninhado para os dados do cartão
        number: ['', Validators.required],                                  // Campo número do cartão com valor inicial vazio e validação de obrigatoriedade
        limit: [0, Validators.required]                                     // Campo limite do cartão com valor inicial 0 e validação de obrigatoriedade
      })
    });
  }

  // Método auxiliar para criar um FormGroup para itens (features e news)   // Comentário explicando o método abaixo
  createItemFormGroup(): FormGroup {                                        // Método que cria um grupo de formulário para itens (recursos e notícias)
    return this.formBuilder.group({                                         // Retorna um novo grupo de formulário
      icon: ['', Validators.required],                                      // Campo ícone com valor inicial vazio e validação de obrigatoriedade
      description: ['', Validators.required]                                // Campo descrição com valor inicial vazio e validação de obrigatoriedade
    });
  }

  onSubmit(): void {                                                        // Método chamado quando o formulário é enviado
    // Limpa mensagens anteriores quando tenta enviar o formulário          // Comentário explicando as duas linhas abaixo
    this.errorMessage = '';                                                 // Limpa a mensagem de erro
    this.successMessage = '';                                               // Limpa a mensagem de sucesso

    if (this.userForm.valid) {                                              // Verifica se o formulário é válido (todos os campos obrigatórios preenchidos)
      const user: User = this.userForm.value;                               // Obtém os valores do formulário como um objeto User
      this.apiService.createUser(user).subscribe({                          // Chama o método createUser do serviço API e se inscreve para receber a resposta
        next: (response) => {                                               // Função chamada quando a criação é bem-sucedida
          console.log('Usuário criado com sucesso', response);              // Mostra mensagem de sucesso no console
          this.successMessage = 'Usuário criado com sucesso!';              // Define uma mensagem de sucesso para o usuário
          setTimeout(() => {                                                // Define um temporizador para redirecionar após 2 segundos
            this.router.navigate(['/view-all']);                            // Navega para a página de visualização de todos os usuários
          }, 2000);
        },
        error: (error) => {                                                 // Função chamada quando ocorre um erro
          console.error('Erro ao criar usuário', error);                    // Mostra o erro no console

          // Verifica o tipo de erro baseado na resposta da API             // Comentário explicando o bloco de tratamento de erro abaixo
          if (error.error && typeof error.error === 'string') {             // Verifica se o erro tem uma propriedade error que é uma string
            // Verifica se a mensagem de erro contém informações sobre conta ou cartão duplicados // Comentário explicando as verificações abaixo
            if (error.error.includes('conta') || error.error.toLowerCase().includes('account')) { // Verifica se a mensagem de erro menciona conta
              this.errorMessage = 'Número de conta já existe!';             // Define uma mensagem de erro específica para conta duplicada
            } else if (error.error.includes('cartão') || error.error.toLowerCase().includes('card')) { // Verifica se a mensagem de erro menciona cartão
              this.errorMessage = 'Número de cartão já existe!';            // Define uma mensagem de erro específica para cartão duplicado
            } else {                                                        // Se não for nenhum dos casos específicos
              this.errorMessage = 'Erro ao criar usuário. Tente novamente mais tarde.'; // Define uma mensagem de erro genérica
            }
          } else {                                                          // Se o erro não tiver uma propriedade error que é uma string
            // Tratamento genérico para outros tipos de erro                // Comentário explicando o tratamento genérico
            this.errorMessage = 'Erro ao criar usuário. Tente novamente mais tarde.'; // Define uma mensagem de erro genérica
          }
        }
      });
    } else {                                                                // Se o formulário não for válido
      this.markFormGroupTouched(this.userForm);                             // Marca todos os campos como tocados para mostrar erros de validação
    }
  }

  // Helper method to mark all controls as touched                          // Comentário explicando o método abaixo
  markFormGroupTouched(formGroup: FormGroup) {                              // Método auxiliar para marcar todos os controles como tocados, ele recebe um grupo de formulário (como a caixa grande do formulário inteiro ou as caixinhas menores de conta/cartão) para trabalhar.
    Object.values(formGroup.controls).forEach(control => {                  // Pense nisso como abrir a caixa de formulário que você recebeu e pegar todos os "controles" (que são como os campos de texto, números, etc.) que estão diretamente dentro dela, e então, para cada um desses controles, fazer algo.
      control.markAsTouched();                                              // Esta linha é como "tocar" no controle atual. Ela diz para o Angular: "Este campo foi tocado pelo usuário (ou pelo nosso ajudante aqui)!". Isso é importante para que o Angular saiba quando mostrar mensagens de erro de validação para campos obrigatórios que estão vazios.
      if ((control as any).controls) {                                      // Aqui, o ajudante verifica se o controle atual que ele está olhando é, na verdade, uma outra "caixinha" de formulário (um FormGroup aninhado, como as caixas de conta ou cartão). Ele usa '(control as any).controls' porque nem todo controle tem outros controles dentro, só os grupos.
        this.markFormGroupTouched(control as FormGroup);                    // Se o controle atual for uma caixinha (um FormGroup), o ajudante chama a si mesmo de novo, mas agora para essa caixinha menor! Isso é chamado de "recursão", é como um espelho que reflete outro espelho, permitindo que ele vá fundo em todas as caixinhas dentro das caixinhas até tocar em todos os campos.
      }
    });
  }
  // FIXME: parecer que não está sendo usado.
  cancel(): void {                                                          // Método que cancela a criação e volta para a lista de usuários
    this.router.navigate(['/view-all']);                                    // Navega para a página de visualização de todos os usuários
  }

  goToMenu() {                                                              // Método para voltar para o menu principal
    this.router.navigate(['/menu']);                                        // Navega para a página de menu
  }

}                                                                           // Fecha a classe do componente

import { Component } from '@angular/core';                          // Importa a classe Component do Angular, necessária para criar componentes
import { CommonModule } from '@angular/common';                      // Importa o módulo comum que contém diretivas básicas como ngIf e ngFor

@Component({                                                         // Decorador que marca esta classe como um componente Angular
  selector: 'app-footer',                                            // Define o nome da tag HTML para este componente (<app-footer></app-footer>)
  standalone: true,                                                  // Indica que este é um componente standalone (não precisa de um módulo)
  imports: [CommonModule],                                           // Lista de módulos que este componente precisa usar
  templateUrl: './footer.component.html',                            // Caminho para o arquivo HTML que define a estrutura visual
  styleUrls: ['./footer.component.css']                              // Caminho para o arquivo CSS que define os estilos
})
export class FooterComponent {                                       // Define a classe do componente que será exportada
  copyEmail() {                                                      // Método que copia o email para a área de transferência
    const email = 'caiocabral.ep@gmail.com';                         // Define a constante email com o endereço de email do desenvolvedor
    navigator.clipboard.writeText(email).then(() => {                // Usa a API Clipboard para copiar o texto para a área de transferência
      alert('Email copiado para a área de transferência!');          // Mostra um alerta informando que o email foi copiado com sucesso
    });
  }
}

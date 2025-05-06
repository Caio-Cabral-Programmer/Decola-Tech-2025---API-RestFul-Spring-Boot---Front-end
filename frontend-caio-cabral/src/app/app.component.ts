import { Component, OnInit } from '@angular/core';  // Importa as classes Component e OnInit do Angular, que são necessárias para criar componentes e inicializá-los
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';  // Importa classes para trabalhar com navegação e rotas no aplicativo
import { CommonModule } from '@angular/common';  // Importa o módulo comum que contém diretivas básicas como ngIf e ngFor
import { HeaderComponent } from './components/header/header.component';  // Importa o componente de cabeçalho que será mostrado no topo da página
import { FooterComponent } from './components/footer/footer.component';  // Importa o componente de rodapé que será mostrado na parte inferior da página
import { filter } from 'rxjs/operators';  // Importa o operador filter do RxJS para filtrar eventos de navegação

@Component({  // Decorador que marca esta classe como um componente Angular
  selector: 'app-root',  // Define o nome da tag HTML que será usada para inserir este componente (como <app-root></app-root>)
  standalone: true,  // Indica que este é um componente standalone (não precisa de um módulo)
  imports: [  // Lista de módulos e componentes que este componente precisa usar
    CommonModule,  // Módulo com diretivas básicas como ngIf e ngFor
    RouterOutlet,  // Permite que o roteador insira componentes baseados na URL atual
    HeaderComponent,  // Componente de cabeçalho que será mostrado no topo
    FooterComponent,  // Componente de rodapé que será mostrado na parte inferior
  ],
  templateUrl: './app.component.html',  // Caminho para o arquivo HTML que define a estrutura visual deste componente
  styleUrls: ['./app.component.css']  // Caminho para o arquivo CSS que define os estilos deste componente
})
export class AppComponent implements OnInit {  // Define a classe do componente e implementa a interface OnInit
  title = 'frontend-caio-cabral';  // Define uma propriedade title que pode ser usada no template HTML

  constructor(private router: Router) {}  // Construtor que recebe o serviço Router para trabalhar com navegação

  ngOnInit(): void {  // Método que é executado quando o componente é inicializado
    // Solução 1: Rola para o topo na inicialização
    window.scrollTo(0, 0);  // Rola a janela para o topo quando o aplicativo é iniciado

    // Solução 2: Rola para o topo após cada navegação
    this.router.events.pipe(  // Acessa os eventos do roteador e aplica um operador pipe
      filter(event => event instanceof NavigationEnd)  // Filtra apenas os eventos de tipo NavigationEnd (quando a navegação termina)
    ).subscribe(() => {  // Se inscreve para executar uma função quando esses eventos ocorrerem
      window.scrollTo(0, 0);  // Rola a janela para o topo
      document.documentElement.scrollTop = 0;  // Define o scroll do elemento HTML para 0 (topo)
      document.body.scrollTop = 0; // Para navegadores mais antigos  // Define o scroll do body para 0 (funciona em navegadores mais antigos)
    });
  }
}

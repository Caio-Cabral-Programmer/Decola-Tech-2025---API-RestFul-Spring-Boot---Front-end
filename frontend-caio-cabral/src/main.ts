import { bootstrapApplication } from '@angular/platform-browser';  // Importa a função que inicia o aplicativo Angular, como a chave que liga o motor!
import { provideRouter } from '@angular/router';  // Importa a função que configura o sistema de navegação, como um mapa para seu aplicativo
import { AppComponent } from './app/app.component';  // Importa o componente principal do aplicativo, como a sala de estar da sua casa digital
import { routes } from './app/app.routes';  // Importa as rotas definidas, como os caminhos que levam a diferentes cômodos da casa
import { provideHttpClient } from '@angular/common/http';  // Importa a função que permite fazer requisições para servidores, como um telefone para ligar para amigos

bootstrapApplication(AppComponent, {  // Inicia o aplicativo Angular usando o AppComponent como ponto de partida, como dar a partida no carro
  providers: [  // Define os serviços que estarão disponíveis em todo o aplicativo, como ferramentas em uma caixa de ferramentas
    provideRouter(routes),  // Configura o sistema de navegação com as rotas definidas, como instalar o GPS no carro
    provideHttpClient(),  // Configura o sistema para fazer requisições HTTP, como instalar um telefone no carro

    // Adicione outros providers globais se necessário  // Um lembrete para adicionar mais serviços se precisar no futuro
  ]
}).catch(err => console.error(err));  // Captura e mostra qualquer erro que aconteça durante a inicialização, como uma rede de segurança

/* Este arquivo é super importante porque:

1. É o ponto de entrada : Todo o seu aplicativo Angular começa a partir daqui, como a primeira página de um livro de histórias!
2. Configura serviços essenciais : Ele configura o roteamento (navegação) e a comunicação HTTP, que são fundamentais para seu aplicativo funcionar.
3. Inicializa o componente principal : Carrega o AppComponent , que é a base para todos os outros componentes, como o alicerce de uma casa.
4. Gerencia erros : Captura erros durante a inicialização, evitando que seu aplicativo quebre silenciosamente.
5. Define a estrutura básica : Estabelece como seu aplicativo vai se comunicar com o mundo exterior (através do HTTP) e como vai navegar internamente (através do router). */
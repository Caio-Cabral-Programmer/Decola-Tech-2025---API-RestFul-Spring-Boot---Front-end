// app.config.ts (toda configuração aqui)  // Este comentário indica que todas as configurações do aplicativo estão neste arquivo
import { ApplicationConfig } from '@angular/core';  // Importa a classe que define a estrutura de configuração do aplicativo Angular
import { provideRouter } from '@angular/router';  // Importa a função que configura o sistema de navegação entre páginas
import { routes } from './app.routes';  // Importa as rotas definidas no arquivo app.routes.ts para navegação no aplicativo
import { provideHttpClient } from '@angular/common/http';  // Importa a função que permite fazer requisições HTTP para servidores
import { provideAnimations } from '@angular/platform-browser/animations';  // Importa a função que habilita animações no aplicativo
import { provideClientHydration } from '@angular/platform-browser';  // Importa a função que ajuda na renderização do lado do servidor

export const appConfig: ApplicationConfig = {  // Cria e exporta a configuração do aplicativo para ser usada no main.ts
  providers: [  // Define a lista de provedores (serviços) que estarão disponíveis em todo o aplicativo
    provideRouter(routes),  // Configura o sistema de navegação com as rotas definidas em app.routes.ts
    provideHttpClient(),  // Configura o cliente HTTP para fazer requisições a servidores (como sua API REST)
    provideAnimations(),  // Habilita o sistema de animações para transições suaves no aplicativo
    provideClientHydration()  // Configura a hidratação do cliente para melhor desempenho com SSR (Server-Side Rendering)
    // Todos os providers globais aqui  // Comentário lembrando que você pode adicionar mais provedores globais se necessário
  ]  // Fecha a lista de provedores
};  // Fecha a definição da configuração do aplicativo


/* ## Por que este arquivo é importante?
Este arquivo é super importante porque:

1. É o centro de configuração : Ele contém todas as configurações principais que seu aplicativo Angular precisa para funcionar. É como o cérebro do seu aplicativo!
2. Configura serviços essenciais : Ele configura o roteamento, o HTTP, as animações e a hidratação, que são fundamentais para um aplicativo Angular moderno. É como dar superpoderes ao seu aplicativo!
3. Centraliza providers : Todos os provedores globais ficam em um só lugar, o que torna mais fácil gerenciar e entender o que seu aplicativo precisa. É como ter todas as suas ferramentas organizadas em uma só caixa!
4. Facilita a manutenção : Como tudo está em um só lugar, é mais fácil fazer alterações quando necessário. É como ter um controle remoto com todos os botões importantes!
5. Suporta a arquitetura standalone : Este arquivo é parte da nova abordagem "standalone" do Angular, que é mais simples e moderna que a abordagem baseada em módulos. É como usar a versão mais nova e legal de um brinquedo!
## Como isso funciona no seu projeto?
No seu projeto de gerenciamento de contas bancárias, este arquivo garante que:

- Os usuários possam navegar entre diferentes páginas (como home, menu, create, etc.)
- O aplicativo possa se comunicar com o servidor backend para buscar e salvar dados de contas
- As transições entre páginas tenham animações suaves e bonitas
- O aplicativo funcione bem tanto no navegador quanto com renderização do lado do servidor
É como se este arquivo fosse o maestro de uma orquestra, garantindo que todos os instrumentos (partes do seu aplicativo) toquem em harmonia!

## Diferença entre app.config.ts e main.ts
Você pode estar se perguntando: "Mas eu já vi configurações no arquivo main.ts também! Qual a diferença?"

O main.ts é o ponto de entrada do seu aplicativo, onde tudo começa. Ele usa as configurações definidas no app.config.ts para iniciar o aplicativo. É como se:

- app.config.ts fosse a receita do bolo
- main.ts fosse o cozinheiro que segue a receita para fazer o bolo
Nas versões mais recentes do Angular (como a 19.2 que você está usando), o Angular incentiva o uso do app.config.ts para manter todas as configurações em um só lugar, tornando o código mais organizado e fácil de entender. */
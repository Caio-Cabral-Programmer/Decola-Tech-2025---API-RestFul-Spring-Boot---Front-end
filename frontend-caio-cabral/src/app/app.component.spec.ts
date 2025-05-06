import { TestBed } from '@angular/core/testing';  // Importa a ferramenta TestBed do Angular, que é como uma caixa de ferramentas especial para testes
import { AppComponent } from './app.component';  // Importa o componente que vamos testar, como trazer o brinquedo para a sala de testes

describe('AppComponent', () => {  // Inicia um grupo de testes para o AppComponent, como dizer "vamos testar este brinquedo agora!"
  beforeEach(async () => {  // Define o que deve acontecer antes de cada teste, como preparar o ambiente para cada brincadeira
    await TestBed.configureTestingModule({  // Configura o módulo de teste, como montar a pista de testes para o carrinho
      imports: [AppComponent],  // Importa o AppComponent para o módulo de teste, como colocar o brinquedo na pista
    }).compileComponents();  // Compila os componentes, como montar todas as peças do brinquedo antes de testar
  });

  it('should create the app', () => {  // Define o primeiro teste: verificar se o componente é criado, como checar se o brinquedo liga
    const fixture = TestBed.createComponent(AppComponent);  // Cria uma instância do componente, como ligar o brinquedo
    const app = fixture.componentInstance;  // Pega a instância do componente, como segurar o brinquedo na mão
    expect(app).toBeTruthy();  // Verifica se a instância existe, como confirmar que o brinquedo está funcionando
  });

  it(`should have the 'frontend-caio-cabral' title`, () => {  // Define o segundo teste: verificar o título do componente
    const fixture = TestBed.createComponent(AppComponent);  // Cria uma instância do componente novamente
    const app = fixture.componentInstance;  // Pega a instância do componente
    expect(app.title).toEqual('frontend-caio-cabral');  // Verifica se o título é 'frontend-caio-cabral', como checar se o nome do brinquedo está certo
  });

  it('should render title', () => {  // Define o terceiro teste: verificar se o título é renderizado na tela
    const fixture = TestBed.createComponent(AppComponent);  // Cria uma instância do componente mais uma vez
    fixture.detectChanges();  // Detecta mudanças no componente, como ligar o brinquedo e ver o que acontece
    const compiled = fixture.nativeElement as HTMLElement;  // Pega o elemento HTML do componente, como olhar para a tela do brinquedo
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, frontend-caio-cabral');  // Verifica se o texto 'Hello, frontend-caio-cabral' aparece em um elemento h1
  });
});
import { TestBed } from '@angular/core/testing';  // Importa a ferramenta TestBed do Angular, que é como uma caixa de ferramentas especial para testes
 
import { ApiService } from './api.service';  // Importa o serviço ApiService que vamos testar, como trazer o brinquedo para a sala de testes
 
describe('ApiService', () => {  // Inicia um grupo de testes para o ApiService, como dizer "vamos testar este serviço agora!"
  let service: ApiService;  // Declara uma variável para guardar o serviço que vamos testar, como preparar um lugar na mesa para colocar o brinquedo
 
  beforeEach(() => {  // Define o que deve acontecer antes de cada teste, como arrumar a mesa antes de cada refeição
    TestBed.configureTestingModule({});  // Configura o módulo de teste, como preparar o ambiente para testar o serviço
    service = TestBed.inject(ApiService);  // Cria uma instância do serviço para testar, como pegar o brinquedo da caixa e colocar na mesa
  });
 
  it('should be created', () => {  // Define o primeiro teste: verificar se o serviço é criado corretamente
    expect(service).toBeTruthy();  // Verifica se o serviço existe, como confirmar que o brinquedo está funcionando
  });
});

import { HttpClient } from '@angular/common/http';  // Importa a classe HttpClient que permite fazer requisições HTTP para servidores
import { Injectable } from '@angular/core';  // Importa o decorador Injectable que marca esta classe como um serviço que pode ser injetado em outros componentes
import { Observable } from 'rxjs';  // Importa a classe Observable que permite trabalhar com operações assíncronas e fluxos de dados
import { User } from '../models/user.model';  // Importa o modelo User que define a estrutura de dados de um usuário no sistema

@Injectable({  // Marca esta classe como um serviço injetável, ou seja, que pode ser usado em outros componentes
  providedIn: 'root'  // Define que este serviço estará disponível em toda a aplicação, como um serviço global
})
export class ApiService {  // Define a classe ApiService que será exportada para uso em outros arquivos
  private apiUrl = 'http://localhost:8080/users'; // Ajuste para a URL correta da sua API  // Define a URL base da API onde estão os dados dos usuários

  constructor(private http: HttpClient) { }  // Construtor que recebe uma instância de HttpClient para fazer requisições HTTP

  // Método para criar um novo usuário
  createUser(user: User): Observable<User> {  // Método que recebe um objeto User e retorna um Observable com o usuário criado
    return this.http.post<User>(this.apiUrl, user);  // Faz uma requisição POST para criar um novo usuário no servidor
  }

  // Método para obter todos os usuários
  getUsers(): Observable<User[]> {  // Método que retorna um Observable com um array de usuários
    return this.http.get<User[]>(this.apiUrl);  // Faz uma requisição GET para obter todos os usuários do servidor
  }

  // Alias para getUsers para compatibilidade
  getAllUsers(): Observable<User[]> {  // Método alternativo que faz a mesma coisa que getUsers, mantido para compatibilidade
    return this.getUsers();  // Chama o método getUsers para manter o código DRY (Don't Repeat Yourself)
  }

  // Método para obter um usuário específico por ID
  getUserById(id: number): Observable<User> {  // Método que recebe um ID e retorna um Observable com o usuário correspondente
    return this.http.get<User>(`${this.apiUrl}/${id}`);  // Faz uma requisição GET para obter um usuário específico pelo ID
  }

  // Alias para getUserById para compatibilidade
  getUser(id: number): Observable<User> {  // Método alternativo que faz a mesma coisa que getUserById, mantido para compatibilidade
    return this.getUserById(id);  // Chama o método getUserById para manter o código DRY
  }

  // Método para atualizar um usuário
  updateUser(id: number, user: User): Observable<User> {  // Método que recebe um ID e um objeto User e retorna um Observable com o usuário atualizado
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);  // Faz uma requisição PUT para atualizar um usuário existente no servidor
  }

  // Método para excluir um usuário
  deleteUser(id: number): Observable<void> {  // Método que recebe um ID e retorna um Observable vazio após a exclusão
    return this.http.delete<void>(`${this.apiUrl}/${id}`);  // Faz uma requisição DELETE para remover um usuário do servidor
  }
}

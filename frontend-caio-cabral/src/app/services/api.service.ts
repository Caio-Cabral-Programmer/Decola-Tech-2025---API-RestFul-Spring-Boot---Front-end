import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/users'; // Ajuste para a URL correta da sua API

  constructor(private http: HttpClient) { }

  // Método para criar um novo usuário
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Método para obter todos os usuários
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Alias para getUsers para compatibilidade
  getAllUsers(): Observable<User[]> {
    return this.getUsers();
  }

  // Método para obter um usuário específico por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Alias para getUserById para compatibilidade
  getUser(id: number): Observable<User> {
    return this.getUserById(id);
  }

  // Método para atualizar um usuário
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  // Método para excluir um usuário
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

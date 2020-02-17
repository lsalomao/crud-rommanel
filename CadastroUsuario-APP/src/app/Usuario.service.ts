import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../app/Usuario';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioService {

constructor(private http: HttpClient) { }
    Url = 'http://localhost:5000/api/Usuarios';

    getUsers(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.Url);
    }
    getUserById(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.Url}/${id}`);
    }
    createUser(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.Url, usuario);
    }
    editUser(usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.Url}/${usuario.Id}`, usuario);
    }
    deleteUser(usuario: Usuario) {
        console.log(`${this.Url}/${usuario.id}`);
        return this.http.delete(`${this.Url}/${usuario.id}`);
    }
}

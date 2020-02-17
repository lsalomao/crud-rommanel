import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../Usuario.service';
import { Usuario } from '../Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  usuarios: Usuario[];
  constructor(private service: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.service.getUsers().subscribe( data => {
      this.usuarios = data;
      console.log(data);
    });
  }
  btnEditar(usuario: Usuario) {
    console.log(usuario);
    window.localStorage.removeItem('editUserId');
    window.localStorage.setItem('editUserId', usuario.id.toString());
    this.router.navigate([`/editar/`, usuario.id]);
  }

  btnExcluir(usuario: Usuario) {
    console.log(usuario);
    this.service.deleteUser(usuario).subscribe( data => {
     this.usuarios = this.usuarios.filter( u => u.id !== usuario.id);
    });
  }
}

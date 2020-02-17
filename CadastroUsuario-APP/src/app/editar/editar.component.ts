import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../Usuario.service';
import { Usuario } from '../Usuario';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  UsuarioForm: any;
  usuario: Usuario;
  submitted = false;
  userId: any;

  constructor(
    private service: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.userId = window.localStorage.getItem('editUserId');
    if (!this.userId) {
      alert('Invalid action.')
      this.router.navigate(['listar']);
      return;
    }

    this.createForm(new Usuario());
    this.service.getUserById(this.userId).subscribe( data => {
      console.log(data);
      this.UsuarioForm.patchValue({
        Id: data.id,
        Nome: data.nome,
        Email: data.email,
        CPF: data.cpf,
        DataNascimento: formatDate(data.dataNascimento, 'yyyy-MM-dd', 'en'),
        Cidade: data.cidade,
        Cep: data.cep,
        Estado: data.estado
      });
    });
  }

  get form() { return this.UsuarioForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.UsuarioForm.invalid) {
      return;
    }
    console.log(this.UsuarioForm.value);
    this.service.editUser(this.UsuarioForm.value).subscribe(data => {
      console.log(data);
      this.router.navigate([`/listar`]);
    });
  }

  createForm(usuario: Usuario) {
    this.UsuarioForm = this.formBuilder.group({
      Id: [usuario.id],
      Nome: [usuario.nome, Validators.required],
      Email: [usuario.email, Validators.required],
      CPF: [usuario.cpf, Validators.required],
      DataNascimento: [usuario.dataNascimento, Validators.required],
      Cidade: [usuario.cidade, Validators.required],
      Cep: [usuario.cep, Validators.required],
      Estado: [usuario.estado, Validators.required]
    });
  }
}

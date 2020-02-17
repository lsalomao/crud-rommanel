import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../Usuario.service';
import { Usuario } from '../Usuario';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {
  UsuarioForm: any;
  usuario: Usuario;
  submitted = false;

  constructor(
    private service: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.createForm(new Usuario());
  }

  get form() { return this.UsuarioForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.UsuarioForm.invalid) {
      return;
    }
    console.log(this.UsuarioForm.value);

    this.service.createUser(this.UsuarioForm.value).subscribe(data => {
      console.log(data);
      this.router.navigate([`/listar`]);
    });
  }

  createForm(usuario: Usuario) {
    this.UsuarioForm = this.formBuilder.group({
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

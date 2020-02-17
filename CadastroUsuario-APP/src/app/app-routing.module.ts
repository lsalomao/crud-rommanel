import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarComponent } from '../app/listar/listar.component';
import { NovoComponent } from '../app/novo/novo.component';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [
  {path : 'listar' , component: ListarComponent },
  {path : 'novo' , component: NovoComponent },
  {path : 'editar/:id' , component: EditarComponent },
  { path: '', redirectTo: '/listar', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

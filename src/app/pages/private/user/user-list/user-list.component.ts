import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { Component } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Route, Router } from '@angular/router';
import { PageTitleComponent } from '../../../../core/components/page-title/page-title.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, PageTitleComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  displayedColumns: string[] = ["id", "name", "email", "cpf",  "editar", "excluir"];
  example = [
    {id: 1, name: "Marlon Nunes", email: "marlonnunes869@gmail.com", cpf: "863.322.950-15"},
    {id: 2, name: "Marlon Nunes", email: "marlonnunes869@gmail.com", cpf: "863.322.950-15"},
    {id: 3, name: "Marlon Nunes", email: "marlonnunes869@gmail.com", cpf: "863.322.950-15"},
    {id: 4, name: "Marlon Nunes", email: "marlonnunes869@gmail.com", cpf: "863.322.950-15"},
    {id: 5, name: "Marlon Nunes", email: "marlonnunes869@gmail.com", cpf: "863.322.950-15"},
    {id: 6, name: "Marlon Nunes", email: "marlonnunes869@gmail.com", cpf: "863.322.950-15"},
    {id: 7, name: "Marlon Nunes", email: "marlonnunes869@gmail.com", cpf: "863.322.950-15"},
    {id: 8, name: "Marlon Nunes", email: "marlonnunes869@gmail.com", cpf: "863.322.950-15"},
    {id: 9, name: "Marlon Nunes", email: "marlonnunes869@gmail.com", cpf: "863.322.950-15"},
    {id: 10, name: "Marlon Nunes", email: "marlonnunes869@gmail.com", cpf: "863.322.950-15"}
  ]

  constructor(
    private router: Router
  ){
  }

  registerNewUser(id?: string){
    this.router.navigateByUrl("/users/register")
  }
}

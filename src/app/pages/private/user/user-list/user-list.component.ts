import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Route, Router } from '@angular/router';
import { PageTitleComponent } from '../../../../core/components/page-title/page-title.component';
import { UserManagementService } from '../../../../service/user-management.service';
import { SearchParams, UserDTO } from '../../../../model/user';
import { PageDTO } from '../../../../model/shared';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, PageTitleComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "email", "cpf",  "editar", "excluir"];
  userPage: PageDTO<UserDTO>;

  constructor(
    private readonly router: Router,
    private readonly service: UserManagementService
  ){
  }
  ngOnInit(): void {
    this.search({});
  }

  private search(userFilter: SearchParams){
    this.service.search(userFilter).subscribe({
      next: resp => this.userPage = resp
    });
  }

  registerNewUser(id?: string){
    this.router.navigateByUrl("/users/register")
  }
}

import { Component, OnInit } from '@angular/core';
import { StoreDetails, StoreParams } from '../../../../model/store';
import { PageDTO } from '../../../../model/shared';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { PageTitleComponent } from '../../../../core/components/page-title/page-title.component';
import { StoreManagementService } from '../../../../service/store-management.service';

@Component({
  selector: 'app-store-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, PageTitleComponent],
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.scss'
})
export class StoreListComponent implements OnInit {


  displayedColumns: string[] = ["id", "nome", "cnpj", "uf", "cidade", "endereço", "editar", "excluir"];
  storePage: PageDTO<StoreDetails>;

  constructor(
    private readonly router: Router,
    private readonly service: StoreManagementService
  ) {
  }

  ngOnInit(): void {
    this.search({});
  }

  private search(userFilter: StoreParams) {
    this.service.search(userFilter).subscribe({
      next: resp => this.storePage = resp
    });
  }

  goToDetail(id: number) {
    this.router.navigateByUrl("/admin/store/update/" + id);
  }

  registerNewStore(id?: string) {
    this.router.navigateByUrl("/admin/store/register")
  }

}

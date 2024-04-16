import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Router } from '@angular/router';

interface FoodNode {
  name: string;
  children?: FoodNode[];
  redirect?: string;
}

const TREE_DATA: FoodNode[] = [
  {
    name: "Administrador",
    children: [
      {name: 'Relatórios'}, {name: "Lojas"}, {name: "Usuários", redirect: "/admin/user"}, 
      ]
  },
  {
    name: "Comercialização",
    children: [{name: "Veículos"}, {name: 'Propostas'}, {name: 'Minhas vendas'}]
  },

  {
    name: "Mercado",
    children: [{name: "Veículos"}, {name: 'Minhas propostas'}, {name: 'Meus alugueis'}]
  }
]

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  @Output("toggleDrawer") toggleDrawer = new EventEmitter<void>()

  constructor(
    private router: Router
  ){
    this.dataSource.data = TREE_DATA;
  }
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  redirectTo(link: string) {
    if(!link){
      return;
    }

    this.router.navigateByUrl(link);
    this.toggleDrawer.emit();
  }
}

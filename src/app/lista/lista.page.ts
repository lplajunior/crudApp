import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../model/Produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: 'lista.page.html',
  styleUrls: ['lista.page.scss']
})
export class ListaPage implements OnInit {
  
  produtos: Produto;

  constructor(private prdService: ProdutoService, private router: Router) {
  }
  
  ngOnInit(): void {
    this.listaProdutos();
  }

  listaProdutos() {
    //Get saved list of students
    this.prdService.selectProdutos().subscribe(response => {
      console.log(response);
      this.produtos = response;
    })
  }

  editarProduto(id: number) {
    this.router.navigate(['tabs/editar', id]);
  }

  excluirProduto(id: number) {
    this.prdService.deleteProduto(id).subscribe(
      () => {
        this.router.navigateByUrl('tabs/lista');
        this.listaProdutos();
      },
      errorDelete => console.log(errorDelete)
    );
  }
}

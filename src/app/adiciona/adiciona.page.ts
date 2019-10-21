import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adiciona',
  templateUrl: 'adiciona.page.html',
  styleUrls: ['adiciona.page.scss']
})
export class AdicionaPage implements OnInit {

  produtoForm: FormGroup;
  produto: Produto;
  produtoID: number;
  editable: boolean = false;
  
  constructor(private formBuilder: FormBuilder, 
              private route: ActivatedRoute, 
              private router: Router,
              private prdService: ProdutoService) {}

  ngOnInit() {
    this.produtoForm = this.formBuilder.group({
      
            //atributo: [param1, param2]
            // param1 -> equivale ao valor do campo
            // param2 -> equivale as validações para aquele campo

      nm_produto: [
        '',
        [
          Validators.required, // validação de campo requirido
          Validators.minLength(4), // validação de minimo de caracteres
          Validators.maxLength(100), // validação de maximo de caracteres
        ]
      ], 
      qnt_produto: [
        '',
        [
          Validators.required, // validação de campo requirido
          Validators.minLength(1), // validação de minimo de caracteres
          Validators.maxLength(4), // validação de maximo de caracteres
          Validators.pattern("^[0-9]*$") // validação para somente números
        ]
      ], 
      preco_produto: [
        '',
        [
          Validators.required, // validação de campo requirido
          Validators.minLength(4), // validação de minimo de caracteres
          Validators.maxLength(8), // validação de maximo de caracteres
        ]
      ], 
      img_produto: [
        '',
        [
          Validators.required, // validação de campo requirido
          Validators.minLength(5), // validação de minimo de caracteres
          Validators.maxLength(255), // validação de maximo de caracteres
        ]
      ]
    });

    this.route.paramMap.subscribe(params => {
      this.produtoID =+ params.get('id');
      if(this.produtoID) {
        this.getProduto(this.produtoID);
        this.editable = true;
      }
    })
  }

  // cadastra o produto
  addProduto() {
    // Resgata os valores do campo e faz um cast(conversão) para o modelo Produto
    const novoProduto = this.produtoForm.getRawValue() as Produto;
    this.prdService
      .addProduto(novoProduto)
      .subscribe(
        () => { // arrow function
         this.router.navigateByUrl('tabs/lista'); // redireciona para a pagina list
         this.produtoForm.reset(); // Limpa os campos do formulario
        },
        error => {
          console.log(error);
          this.produtoForm.reset();
        }
      );
  }

  getProduto(id: number) {
    this.prdService.selectProdutoById(id).subscribe(
      (produtoDB: Produto) => this.loadForm(produtoDB),
      errorDB => console.log(errorDB)
    );
  }

  loadForm(produto: Produto) {
    this.produtoForm.patchValue({
      nm_produto: produto.nm_produto,
      qnt_produto: produto.qnt_produto,
      preco_produto: produto.preco_produto,
      img_produto: produto.img_produto
    });
  }

  editProduto() {
    const produtoEditado = this.produtoForm.getRawValue() as Produto;
    produtoEditado.id = this.produtoID;

    this.prdService.updateProduto(produtoEditado).subscribe(
      () => {
        this.router.navigateByUrl('tabs/lista');
        this.produtoForm.reset();
      },
      error => {
        console.log(error);
        this.produtoForm.reset();
      }
    );
  }
}

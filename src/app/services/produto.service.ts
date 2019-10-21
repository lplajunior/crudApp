import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {// API path
  base_path = 'http://localhost/ws/produto';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Ocorreu um erro no cliente ou na rede.
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      // O back-end retornou um código de resposta sem êxito.
      // O corpo da resposta pode conter pistas sobre o que deu errado.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  /** C.R.U.D **/

  /**
   * addProduto(Produto) - Método responsável por inserir produtos no banco
   */
  public addProduto(produto: Produto): Observable<Produto> {
    return this.http
      .post<Produto>(this.base_path, JSON.stringify(produto), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /**
   * selectProdutoById(id) - Método responsável por buscar um produto pelo id
   */
  public selectProdutoById(id: number): Observable<Produto> {
    return this.http
      .get<Produto>(this.base_path + '?id=' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /**
   * selectProdutoById(id) - Método responsável por buscar um produto pelo id
   */
  public selectProdutos(): Observable<Produto> {
    return this.http
      .get<Produto>(this.base_path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /**
   * updateProduto(Produto) - Método responsável por atualizar um produto
   */
  public updateProduto(produto: Produto): Observable<Produto> {
    return this.http
      .put<Produto>(this.base_path + '?id=' + produto.id, JSON.stringify(produto), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /**
   * deleteProduto(id) - Método responsável por excluir um produto
   */
  public deleteProduto(id: number) {
    return this.http
      .delete<Produto>(this.base_path + '?id=' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
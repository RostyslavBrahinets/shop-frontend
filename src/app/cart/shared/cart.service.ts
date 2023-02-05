import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cart} from './cart.model';
import {User} from '../../users/shared/user.model';
import {Http} from '../../shared/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/carts';

  constructor(
    private http: HttpClient
  ) {
  }

  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.apiUrl);
  }

  getCart(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/${id}`);
  }

  saveCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, cart, Http.getHttpOptions());
  }

  updateCart(cart: Cart): Observable<Cart> {
    const url = `${this.apiUrl}/${cart.id}`;
    return this.http.put<Cart>(url, cart, Http.getHttpOptions());
  }

  saveCartForUser(user: User): void {
    const cart = new Cart();

    this.getCarts().subscribe(
      (carts) => cart.id = (carts.length as number) + 1
    );

    cart.totalCost = 0;
    cart.userId = user.id;

    this.saveCart(cart).subscribe();
  }
}

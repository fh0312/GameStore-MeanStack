import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { ItemService } from './item.service';
import { Item } from './item';


@Injectable({ providedIn: 'root' })

export class CartService {
  
  
  private apiUrl = environment.apiUrl;
  private getItemsUrl: string = this.apiUrl+"/cart";
  private addItemUrl: string = this.apiUrl+"/cart/addItem";
  private delItemUrl: string = this.apiUrl+"/cart/dellItem";
  private dellAllUrl: string = this.apiUrl+"/cart/dellAll";

  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cartItems$: Observable<any[]> = this.cartItemsSubject.asObservable();
  username: any;
  
  
  

  constructor(private http: HttpClient,private itemService: ItemService) { }

  addItemToCart(item: any): void {
    const userString = localStorage.getItem('data');
    if(userString){
      const username = JSON.parse(userString).username;
      console.log("user is: ",username);
      this.username = username;
      const body = { username: username, itemId: item.id};
  
      this.http.post(`${this.addItemUrl}/${username}/${item.id}`,body)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error("Error adding item to cart:", error);
        }
      );
    }
    else{
      alert("Please log in to add items to the cart!");
    }
    
  }
  
  getUsername(){
    const userString = localStorage.getItem('data');
    if(userString){
      const username = JSON.parse(userString).username;
      console.log("user is: ",username);
      this.username = username;
    }
  }

  getCartItems(username: string): any[] {
    this.http.get<any[]>(`${this.getItemsUrl}/${username}`)
      .pipe(
        tap((response) => {
          console.log("CartItems: ", response);
          if (response) {
            const currentItems : Item[] = [];

            response.forEach((id: any) => currentItems.push(this.itemService.getItem(id)));
            this.cartItemsSubject.next(currentItems);
          }
        }),
        catchError((error) => {
          console.error("Error getting cart items:", error);
          return of([]);
        })
      ) .subscribe();
      return this.cartItemsSubject.getValue();
  }

  deleteCartItem(item: any): void {
    this.getUsername();
    const currentItems = this.getCartItems(this.username);
    const index = currentItems.findIndex(cartItem => cartItem === item);
    if (index > -1) {
      const updatedItems = [...currentItems];
      updatedItems.splice(index, 1);
      this.cartItemsSubject.next(updatedItems);
    }
    const body = { username: this.username, itemId: item.id};
    this.http.put(`${this.delItemUrl}/${this.username}/${item.id}`,body)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error("Error deleting :", error);
        }
      );

  }

  clearCartItem(itemToRemove: any): void {
    this.getUsername();
    const cartItems = this.getCartItems(this.username);

    const updatedItems = cartItems.filter(cartItem => cartItem.id !== itemToRemove.id);
    this.cartItemsSubject.next(updatedItems);
    const body = { username: this.username, itemId: itemToRemove.id};
    this.http.put(`${this.dellAllUrl}/${this.username}/${itemToRemove.id}`,body)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error("Error deleting :", error);
        }
      );


  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}

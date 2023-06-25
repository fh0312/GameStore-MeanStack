import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { ItemService } from './item.service';
import { Item } from './item';


@Injectable({ providedIn: 'root' })

export class WishlistService {
  
  
  private apiUrl = environment.apiUrl;
  private getItemsUrl: string = this.apiUrl+"/wishlist";
  private addItemUrl: string = this.apiUrl+"/wishlist/addItem";
  private dellAllUrl: string = this.apiUrl+"/wishlist/dellAll";

  private wishlistItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public wishlistItems$: Observable<any[]> = this.wishlistItemsSubject.asObservable();
  username: any;
  
  
  

  constructor(private http: HttpClient,private itemService: ItemService) { }

  addItemToWishlist(item: any): void {
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
          console.error("Error adding item to wishlist:", error);
        }
      );
    }
    else{
      alert("Please log in to add items to the wishlist!");
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

  getWishlistItems(username: string): any[] {
    this.http.get<any[]>(`${this.getItemsUrl}/${username}`)
      .pipe(
        tap((response) => {
          console.log("WishlistItems: ", response);
          if (response) {
            const currentItems : Item[] = [];

            response.forEach((id: any) => currentItems.push(this.itemService.getItem(id)));
            this.wishlistItemsSubject.next(currentItems);
          }
        }),
        catchError((error) => {
          console.error("Error getting wishlist items:", error);
          return of([]);
        })
      ) .subscribe();
      return this.wishlistItemsSubject.getValue();
  }

  getWishlistItemIds(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.getItemsUrl}/${username}`)
      .pipe(
        tap((response) => {
          console.log("WishlistItems: ", response);
        }),
        catchError((error) => {
          console.error("Error getting wishlist items:", error);
          return of([]);
        })
      );
  }

  clearWishlistItem(itemToRemove: any): void {
    this.getUsername();
    const wishlistItems = this.getWishlistItems(this.username);

    const updatedItems = wishlistItems.filter(wishlistItem => wishlistItem.id !== itemToRemove.id);
    this.wishlistItemsSubject.next(updatedItems);
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

  clearWishlist(): void {
    this.wishlistItemsSubject.next([]);
  }
}

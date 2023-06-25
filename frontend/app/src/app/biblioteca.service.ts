import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { ItemService } from './item.service';
import { Item } from './item';


@Injectable({ providedIn: 'root' })

export class BibliotecaService {
  
  
  private apiUrl = environment.apiUrl;
  private getItemsUrl: string = this.apiUrl+"/biblioteca";
  private bibliotecaItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public bibliotecaItems$: Observable<any[]> = this.bibliotecaItemsSubject.asObservable();
  username: any;
  
  
  

  constructor(private http: HttpClient,private itemService: ItemService) { }

  getUsername(){
    const userString = localStorage.getItem('data');
    if(userString){
      const username = JSON.parse(userString).username;
      console.log("user is: ",username);
      this.username = username;
    }
  }

  getBibliotecaItems(username: string): any[] {
    this.http.get<any[]>(`${this.getItemsUrl}/${username}`) 
    
      .pipe(
        tap((response) => {
          console.log("BibliotecaItems: ", response);
          if (response) {
            const currentItems : any[] = [];
        
            response.forEach( (item: any) => {
              const itemDetails = this.itemService.getItem(item.item);
              const itemAndDate = [itemDetails,item.acquisitionDate];
              currentItems.push(itemAndDate);
              
            });
            this.bibliotecaItemsSubject.next(currentItems);
            
          }
        }),
        catchError((error) => {
          console.error("Error getting biblioteca items:", error);
          return of([]);
        })
      ) .subscribe();

      return this.bibliotecaItemsSubject.getValue();

  }

}

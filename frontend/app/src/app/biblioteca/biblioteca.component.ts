import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../biblioteca.service';


@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent implements OnInit {


  allBibliotecaItems: any[] = [];
  username: string = "";
  message  = "";
  selectedParam: string = "";

  sortedBibliotecaItems: any[] = [];

  constructor(
    private bibliotecaService: BibliotecaService
  ) { }

  ngOnInit() {
    this.getUsername();
    this.updateBibliotecaItems();
    this.bibliotecaService.bibliotecaItems$.subscribe((bibliotecaItems) => {
      this.allBibliotecaItems = bibliotecaItems;
      console.log(this.allBibliotecaItems, "after");
      this.sortedBibliotecaItems = this.allBibliotecaItems;
    });

    setTimeout(() => {
       if (this.allBibliotecaItems.length === 0) {
        this.message = "There are no Items on your Library!"
      }
    }, 200);
  
  }

  getUsername() {
    const userString = localStorage.getItem('data');
    if (userString) {
      const username = JSON.parse(userString).username;
      this.username = username;
    }
  }

  updateBibliotecaItems() {
    this.allBibliotecaItems = this.bibliotecaService.getBibliotecaItems(this.username);
  }

  getQuant(item: any) {
    const id = item.id;
    return this.allBibliotecaItems.filter(item => item.id === id).length;
  }

  getNumero(){
    return this.allBibliotecaItems.length;
  }

  getPrice(item: any) {
    return parseInt(item.price.substring(0, item.price.length - 1));
  }


  getTotal() {
    var total = 0;
    this.allBibliotecaItems.forEach(item => (total = total + this.getPrice(item[0])));
    return total;
  }

  getSortedBibliotecaItems(method: string): any[] {
    if (method === "name"){
      this.sortedBibliotecaItems.sort((a, b) => {
        // Compare the values based on the name property
        const nameA = a[0].name.toUpperCase();
        const nameB = b[0].name.toUpperCase();
        
        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      });
    }else if (method === "date") {
    this.sortedBibliotecaItems.sort((a, b) => {
      // Compare the values based on the acquisition date
      if (a[1] < b[1]) {
        return -1;
      } else if (a[1] > b[1]) {
        return 1;
      } else {
        return 0;
      }
    });
  } 
    return this.sortedBibliotecaItems;
  }
  onSelectedParamChange(): void {
    this.getSortedBibliotecaItems(this.selectedParam);
  }
}
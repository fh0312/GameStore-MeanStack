import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { BibliotecaService } from '../biblioteca.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  allCartItems: any[] = [];
  username: string = "";
  message = "";
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private bibliotecaService: BibliotecaService
  ) { }

  ngOnInit() {
    this.getUsername();
    this.updateCartItems();
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.allCartItems = cartItems;
      console.log(this.allCartItems, "after");
      const uniqueIds = new Set();
      this.cartItems = this.allCartItems.filter((item) => {
        if (!uniqueIds.has(item.id)) {
          uniqueIds.add(item.id);
          return true;
        }
        return false;
      });
    });
  }

  getUsername() {
    const userString = localStorage.getItem('data');
    if (userString) {
      const username = JSON.parse(userString).username;
      this.username = username;
    }
  }

  updateCartItems() {
    setTimeout(() => {
      this.allCartItems = this.cartService.getCartItems(this.username);
      console.log(this.allCartItems);
      const uniqueIds = new Set();
      this.cartItems = this.allCartItems.filter(item => {
        if (!uniqueIds.has(item.id)) {
          uniqueIds.add(item.id);
          return true;
        }
        return false;
      });
    }, 300);
  }

  getQuant(item: any) {
    const id = item.id;
    return this.allCartItems.filter(item => item.id === id).length;
  }

  getNumero(){
    return this.allCartItems.length;
  }

  getPrice(item: any) {
    return parseInt(item.price.substring(0, item.price.length - 1));
  }

  addOne(item: any) {
    this.cartService.addItemToCart(item);
    this.allCartItems.push(item);
  }

  removeOne(item: any) {
    const index = this.allCartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (index > -1) {
      this.allCartItems.splice(index, 1);
      this.cartItems = this.allCartItems.filter((cartItem) => cartItem.id === item.id);
      this.allCartItems.push(item);
    }
    this.cartService.deleteCartItem(item);
    this.updateCartItems();
  }

  removeAll(item: any){
    this.cartService.clearCartItem(item);
    const remainingItems = this.allCartItems.filter((cartItem) => cartItem.id !== item.id);
    this.allCartItems = remainingItems;
    this.cartItems = remainingItems.filter((cartItem) => cartItem.id === item.id);~
    this.updateCartItems();

    
  }

  getTotal() {
    var total = 0;
    this.allCartItems.forEach(item => (total = total + this.getPrice(item)));
    return total;
  }

  getSortedCartItems(): any[] {
    this.cartItems.sort((a, b) => {
      // Compare the values based on your sorting criteria
      if (a.id < b.id) {
        return -1;
      } else if (a.id > b.id) {
        return 1;
      } else {
        return 0;
      }
    });
    return this.cartItems;
  }
  

}
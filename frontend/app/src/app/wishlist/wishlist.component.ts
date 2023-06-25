import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { WishlistService } from '../wishlist.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlistItems: any[] = [];
  allWishlistItems: any[] = [];
  username: string = "";
  message  = "";

  constructor(

    private router: Router,
    private wishlistService: WishlistService
  ) { }

  ngOnInit() {
    this.getUsername();
    this.updateWishlistItems();
    this.wishlistService.wishlistItems$.subscribe((wishlistItems) => {
      this.allWishlistItems = wishlistItems;
      console.log(this.allWishlistItems, "after");
      const uniqueIds = new Set();
      this.wishlistItems = this.allWishlistItems.filter((item) => {
        if (!uniqueIds.has(item.id)) {
          uniqueIds.add(item.id);
          return true;
        }
        return false;
      });
       
    });

    setTimeout(() => {
      
      console.log(this.wishlistItems);
       if (this.wishlistItems.length === 0) {
        this.message = "There are no Items on your Wishlist!"
      }
    }, 600);
  
  }

  getUsername() {
    const userString = localStorage.getItem('data');
    if (userString) {
      const username = JSON.parse(userString).username;
      this.username = username;
    }
  }

  updateWishlistItems() {
   
    setTimeout(() => {
       this.allWishlistItems = this.wishlistService.getWishlistItems(this.username);
      console.log(this.allWishlistItems);
      const uniqueIds = new Set();
      this.wishlistItems = this.allWishlistItems.filter(item => {
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
    return this.allWishlistItems.filter(item => item.id === id).length;
  }

  getNumero(){
    return this.allWishlistItems.length;
  }

  getPrice(item: any) {
    return parseInt(item.price.substring(0, item.price.length - 1));
  }


  removeAll(item: any){
    this.wishlistService.clearWishlistItem(item);
    const remainingItems = this.allWishlistItems.filter((wishlistItem) => wishlistItem.id !== item.id);
    this.allWishlistItems = remainingItems;
    this.wishlistItems = remainingItems.filter((wishlistItem) => wishlistItem.id === item.id);
    this.updateWishlistItems();
    const itemName = item.name;
    this.message = `Item ${itemName} deleted.`;
    setTimeout(() => {
      console.log(this.wishlistItems);
      if (this.wishlistItems.length === 0) {
        this.message = "There are no Items on your Wishlist!"
      }
      this.router.navigate(['/wishlist']);
    }, 1000);
  }

  getTotal() {
    var total = 0;
    this.allWishlistItems.forEach(item => (total = total + this.getPrice(item)));
    return total;
  }

  getSortedWishlistItems(): any[] {
    this.wishlistItems.sort((a, b) => {
      // Compare the values based on your sorting criteria
      if (a.id < b.id) {
        return -1;
      } else if (a.id > b.id) {
        return 1;
      } else {
        return 0;
      }
    });
    return this.wishlistItems;
  }
}
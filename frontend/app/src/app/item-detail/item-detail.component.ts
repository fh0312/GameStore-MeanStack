import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Item } from '../item';
import { ItemService } from '../item.service';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item!: Item;
  currentImage = 1; // initialize with the first image
  message = ""

  constructor(private route: ActivatedRoute, private router: Router,private itemService: ItemService, 
    private cartService: CartService, private wishlistService: WishlistService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.item = this.itemService.getItem(id);
  }

  showNextImage(): void {
    if (this.currentImage < this.getImageCount()) {
      this.currentImage++;
    } else {
      this.currentImage = 1;
    }
  }

  showPrevImage(): void {
    if (this.currentImage > 1) {
      this.currentImage--;
    } else {
      this.currentImage = this.getImageCount();
    }
  }

  switchImage(direction: number) {
    if (direction === -1 && this.item.image1) {
      this.item.image = this.item.image1;
    } else if (direction === 1 && this.item.image2) {
      this.item.image = this.item.image2;
    }
    this.currentImage = 1; // reset the image index to 1
  }

  private getImageCount(): number {
    let count = 1; // always start with the first image
    if (this.item.image1) {
      count++;
    }
    if (this.item.image2) {
      count++;
    }
    return count;
  }

  addToCart(item: any) {
    this.cartService.addItemToCart(item);
    this.message = "Item added to cart!";
  }

  addToWishlist(item: any) {
    const userString = localStorage.getItem('data');
    if (userString) {
      const username = JSON.parse(userString).username;
      this.wishlistService.getWishlistItemIds(username).subscribe(
        wishlistItems => {
          if (!wishlistItems.includes(item.id)) {
            this.wishlistService.addItemToWishlist(item);
            this.message = 'Item added to wishlist. Redirecting now.';
            setTimeout(() => {
              this.router.navigate(['/wishlist']);
            }, 1000); // wait for 2 seconds before redirecting
          } else {
            this.message = "Item is already in wishlist!";
            setTimeout(() => {
              this.router.navigate(['/wishlist']);
            }, 1000); // wait for 2 seconds before redirecting
          }
        },
        error => {
          console.error("Error getting wishlist items:", error);
        }
      )
    }
  }
}
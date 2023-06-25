import { Component } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  items: Item[];

  constructor(private itemService: ItemService, private router: Router) {
    this.items = this.itemService.getItems();
  }

  onItemEnter(item: Item) {
    this.router.navigate(['/item', item.id], { state: { item: item } });
  }
}
import { Component, Input } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css'],
})
export class ItemSearchComponent {
  @ViewChild('searchBox', { static: true })
  searchBox!: ElementRef<HTMLInputElement>;

  isSearchFocused: boolean = false;

  constructor(private ItemService: ItemService, private router: Router) {}
  searchedItems = [] as Item[];

  search(term: string) {
    if (!term.trim()) {
      this.searchedItems = [];
    }
    this.searchedItems = this.ItemService.getItems().filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  onSearchBlur() {
    setTimeout(() => {
      this.isSearchFocused = false;
      this.searchBox.nativeElement.value="";
    }, 200);
  }

  ngAfterViewInit() {
    this.isSearchFocused =
      this.searchBox.nativeElement === document.activeElement;
  }

  goTo(item: Item) {
    console.log('id = ', item.id);
    this.router.navigate(['/item', item.id], { state: { item: item } });
    setTimeout(() => {
      location. reload();
    }, 50);
    
  }
}

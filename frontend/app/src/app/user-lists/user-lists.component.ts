import { Component } from '@angular/core';
import { ListService } from '../list.service';
import { List } from '../list';

@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.css']
})
export class UserListsComponent {
  listas: List[];

  constructor(private listService: ListService) {
    this.listas = listService.getLists();
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  lists: any[] = [
    { name: 'Lista Personalizada 1', items: [] },
    { name: 'Lista Personalizada 2', items: [] },
  ];

  constructor() { }

  getLists(): any[] {
    return this.lists;
  }

  addList(name: string): void {
    this.lists.push({ name: name, items: [] });
  }

  deleteList(index: number): void {
    this.lists.splice(index, 1);
  }

  addItem(listIndex: number, item: any): void {
    this.lists[listIndex].items.push(item);
  }

}
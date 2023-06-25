import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: Item[] = [
    {id: 1, name: 'Minekraft', image: 'minekraft1.jpg', type: 'Game', description: 'Embarca nesta nova aventura!', platform: 'PC or Android/IOS', idiomas: 'PT/ENG', price: '10€', classification: 'NA', aval: 'NA', image1: 'minekraft2.jpg', image2: 'minekraft3.jpg', link: "https://www.youtube.com/watch?v=MmB9b5njVbA&ab_channel=Minecraft" },
    {id: 2, name: 'Caunter Straike', image: 'cs2.jpg', type: 'Game', description: 'Embarca nesta nova aventura!', platform: 'PC', idiomas: 'PT/ENG', price: '10€', classification: 'NA', aval: 'NA', image1: 'cs1.jpg', image2: 'cs3.jpg'  },
    {id: 3, name: 'Legends of League', image: 'lol1.jpg',type: 'Game', description: 'Embarca nesta nova aventura!', platform: 'PC', idiomas: 'PT/ENG', price: '10€', classification: 'NA', aval: 'NA', image1: 'legendsofleague.jpg'},
    {id: 4, name: 'Fortday', image: 'fortday1.jpg', type: 'Game', description: 'Embarca nesta nova aventura!', platform: 'PC/PS4/PS5/XBOX', idiomas: 'PT/ENG', price: '10€', classification: 'NA', aval: 'NA', link: "https://www.youtube.com/watch?v=OmpsKymKh4Y&ab_channel=DieisonGames" },
    {id: 5, name: 'Underwatch', image: 'underwatch.jpg', type: 'Game', description: 'Embarca nesta nova aventura!', platform: 'PC or Android/IOS', idiomas: 'PT/ENG', price: '10€', classification: 'NA', aval: 'NA' },
    {id: 6, name: 'Megatux', image: 'megatux.jpg', type: 'Game', description: 'Embarca nesta nova aventura!', platform: 'PC', idiomas: 'PT/ENG', price: '10€', classification: 'NA', aval: 'NA' },
    {id: 7, name: 'PUGB', image: 'pugb1.jpg', type: 'Game', description: 'Embarca nesta nova aventura!', platform: 'PC/XBOX', idiomas: 'PT/ENG', price: '10€', classification: 'NA', aval: 'NA', image1: 'pugb2.jpg', image2:'pugb3.jpg' },
    {id: 8, name: 'Luigi Kart', image: 'luigi1.jpg',type: 'Game', description: 'Embarca nesta nova aventura!', platform: 'PS4/PS5/XBOX', idiomas: 'PT/ENG', price: '10€', classification: 'NA', aval: 'NA', image1: 'luigi3.png', image2:'luigi2.jpg'},
    {id: 9, name: 'Earth 4', image: 'earth4.jpg', type: 'Game', description: 'Embarca nesta nova aventura!', platform: 'PC', idiomas: 'PT/ENG', price: '10€', classification: 'NA', aval: 'NA', link: "https://www.youtube.com/watch?v=IUN664s7N-c&ab_channel=Eredus"  },
    {id: 10, name: 'Dota 3', image: 'dota 3.jpg', type: 'Game', description: 'Embarca nesta nova aventura!', platform: 'PC', idiomas: 'PT/ENG', price: '10€', classification: 'NA', aval: 'NA', link: "https://www.youtube.com/watch?v=WtCn0yzj5y4&ab_channel=FinargotDota2"},
  ]

  getItems(): Item[] {
    return this.items;
  }

  getItem(id: number): Item {
    const item = this.items.find(item => item.id === id);
    if (!item) {
      throw new Error(`Item with id ${id} not found`);
    }
    return item;
  }

}

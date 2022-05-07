import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  amount: number;
  picture: string;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  data: Product[] = [
    { id: 0, name: 'Rainbow Alstroemeria Bouquet', category:'Flowers', price: 25, amount: 0, picture: 'prod_1.jpg' },
    { id: 1, name: 'Belle Rose Abundance Bouquet', category:'Flowers',  price: 35, amount: 0 , picture: 'prod_2.jpg'},
    { id: 2, name: 'British Spring Tulip Trio Abundance', category:'Flowers', price: 44.99, amount: 0,  picture: 'prod_3.jpg' },
    { id: 3, name: 'Yellow Rose Bouquet', category:'Flowers', price: 26.99, amount: 0, picture: 'prod_4.jpg' },
    { id: 4, name: 'Restore Scended Candle', category: 'Candles', amount: 0, price: 3.99, picture: 'candle_1.jpg'},
    { id: 5, name: 'Neroli, Lime & Bergamot Boxed Candle', amount: 0, category: 'Candles', price: 9.99, picture: 'candle_2.jpg'},
    { id: 6, name: 'Neroli, Lime & Bergamot Boxed Candle', amount: 0, category: 'Candles', price: 9.99, picture: 'candle_3.jpg'},
    { id: 7, name: 'Congratulations Card', category: 'Cards', amount: 0, price: 9.99, picture: 'card_1.jpg' },
    { id: 8, name: 'Congratulations Card', category: 'Cards', amount: 0, price: 9.99, picture: 'card_2.jpg' },
    { id: 9, name: 'Congratulations Card', category: 'Cards', amount: 0, price: 9.99, picture: 'card_3.jpg' },
    { id: 10, name: 'Congratulations Card', category: 'Funeral', amount: 0, price: 9.99, picture: 'funeral_1.jpg'  },
    { id: 11, name: 'Funeral Flowers Wreath ', category: 'Funeral', amount: 0, price: 59.99, picture: 'funeral_2.jpg' },
    { id: 12, name: 'Sympathy flowers ', category: 'Funeral', amount: 0, price: 59.99, picture: 'funeral_3.jpg' },
    { id: 13, name: 'Sympathy flowers ', category: 'Funeral', amount: 0, price: 59.99, picture: 'funeral_4.jpg' }
  ];

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor() { }

  getProducts() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product) {
    let added = false;
    for (const p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount === 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }

  removeAllProducts() {
    for (const [index, p] of this.cart.entries()) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart = [];
      }
    }
  }


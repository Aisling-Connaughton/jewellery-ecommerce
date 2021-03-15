import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {

    // check if cartitem is already in cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
    // find item in cart based on item id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      // check if item found
      alreadyExistsInCart = (existingCartItem != undefined);
      
    }

    if (alreadyExistsInCart) {
      // if present increase quantity
      existingCartItem.quantity++;
    }
    else {
      // if not present add to cart array
      this.cartItems.push(theCartItem);
    }

    // calculate cart total prices and total quantity
    this.computeCartTotals();
  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }

  }

  remove(theCartItem: CartItem) {

    // find index of item in cart array
    const itemIndex = this.cartItems.findIndex(
      tempCartItem => tempCartItem.id == theCartItem.id);

    // if found, remove 
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
      
    }

  }

  computeCartTotals() {
    
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity*currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish new values for all subscribers
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // console log cart data for debugging
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log(`Cart contents`);

    for (let tempCartItem of this.cartItems) {
      const subtTotalPrice = tempCartItem.quantity*tempCartItem.unitPrice;
      console.log(`Name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, price: ${tempCartItem.unitPrice}, sub total: ${subtTotalPrice}`);
    }

    console.log(`total price: ${totalPriceValue.toFixed(2)}, total quantity: ${totalQuantityValue}`);
    console.log(`----------`);

  }

}

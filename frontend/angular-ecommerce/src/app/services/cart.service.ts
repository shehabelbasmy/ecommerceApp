import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:CartItem[]=[]

  totlaPrice:Subject<number>=new BehaviorSubject<number>(0)
  totlaQuantity:Subject<number>=new BehaviorSubject<number>(0)

  constructor() { }

  addToCart(theCartItem:CartItem){

    let alreadyExistItem:boolean=false;
    let existingCartItem:CartItem=undefined

    if(this.cartItems.length>0){

      // for(let tempCartItemp of this.cartItems){

      //   if(tempCartItemp.id===theCartItem.id){
      //     existingCartItem=theCartItem.id
      //     break;
      //   }

      // }

      //-refactorying the for Loop
      existingCartItem=this.cartItems.find(tempCartItem=>tempCartItem.id===theCartItem.id)

      alreadyExistItem=(existingCartItem!=undefined)
    }
    
    if(alreadyExistItem){
      existingCartItem.quantity++;
    }
    else{
      this.cartItems.push(theCartItem)
    }
    this.computeCartTotal();
    
  }

  computeCartTotal() {
    let totalPriceValue:number=0
    let totalQuantityValue:number=0

    for(let currentCartItem of this.cartItems){
      totalPriceValue+=currentCartItem.unitPrice*currentCartItem.quantity
      totalQuantityValue+=currentCartItem.quantity
    }

    this.totlaPrice.next(totalPriceValue)
    this.totlaQuantity.next(totalQuantityValue)

  }

  decreamentQuantity(tempCartItem:CartItem){

    tempCartItem.quantity--;
    if(tempCartItem.quantity===0){
      this.remove(tempCartItem);
    }

  }

  remove(tempCartItem: CartItem) {
    const indexOf = this.cartItems.findIndex(cartItem=>cartItem.id===tempCartItem.id)

    if(indexOf>-1){
      this.cartItems.splice(indexOf,1)
    }
    this.computeCartTotal()
  }
}

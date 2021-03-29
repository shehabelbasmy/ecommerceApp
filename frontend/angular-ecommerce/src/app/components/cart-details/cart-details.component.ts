import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems:CartItem[]=[]

  totalPrice:number=0
  totalQuantity:number=0

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    
    this.listCartDetails();
  }

  private listCartDetails() {
    this.cartItems = this.cartService.cartItems;
    console.log(JSON.stringify(this.cartItems));

    this.cartService.totlaPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totlaQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotal();
  }

  icreamentQuantity(tempCartItme:CartItem){
    this.cartService.addToCart(tempCartItme)
  }

  decreamentQuqntity(tempCartItme:CartItem){
    this.cartService.decreamentQuantity(tempCartItme)
  }

  remove (theCartItem:CartItem){
    this.cartService.remove(theCartItem)
  }
}

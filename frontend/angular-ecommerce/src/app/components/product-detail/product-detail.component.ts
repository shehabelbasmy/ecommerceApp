import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product:Product=new Product();

  constructor(private productservice:ProductService,private route:ActivatedRoute,
              private cartService:CartService) { }

  ngOnInit(): void {
    const productId=+this.route.snapshot.paramMap.get("id")
    
    //- asynchronous call
    this.productservice.getSingleProduct(productId).subscribe(
      data=>
        this.product=data
    )
  }

  addToCart(tempProduct:Product){
    this.cartService.addToCart(new CartItem(tempProduct));
  }

}

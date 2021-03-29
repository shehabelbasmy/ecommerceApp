import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products: Product[] = []
    currentCategoryId: number = 1
    previousCategoryId: number = 1;
    searhMode: boolean = false

    pageNumber: number = 1;
    pageSize: number = 10
    totalElemnets: number = 0

    previousKeyWord:string=null

    constructor(private productService: ProductService,
        private router: ActivatedRoute,private cartService:CartService) { }

    ngOnInit() {
        this.router.paramMap.subscribe(() => {
            this.listProducts();
        });
    }


    listProducts() {

        this.searhMode = this.router.snapshot.paramMap.has('keyword');
    
        if (this.searhMode) {
          this.doSearch();
        }
        else {
          this.handlListProduct();
        }
    
    }

    doSearch() {

        const theKeyword: string = this.router.snapshot.paramMap.get('keyword');

        if (this.previousKeyWord!=theKeyword){
            this.pageNumber=1
        }
        this.previousKeyWord=theKeyword
        // now search for the products using keyword

        this.productService.searchProductPaginate(this.pageNumber-1,this.pageSize,theKeyword).subscribe(
            this.processResult()
        )
    }
    handlListProduct() {
        // check if "id" parameter is available
        const hasCategoryId: boolean = this.router.snapshot.paramMap.has('id');

        if (hasCategoryId) {
            // get the "id" param string. convert string to a number using the "+" symbol
            this.currentCategoryId = +this.router.snapshot.paramMap.get('id');
        }
        else {
            // not category id available ... default to category id 1
            this.currentCategoryId = 1;
        }
        //
        // Check if we have a different category than previous
        // Note: Angular will reuse a component if it is currently being viewed
        //

        // if we have a different category id than previous
        // then set thePageNumber back to 1
        if (this.previousCategoryId != this.currentCategoryId) {
            this.pageNumber = 1;
        }

        this.previousCategoryId = this.currentCategoryId;

        this.productService.getProductListPagenation(this.pageNumber - 1,
            this.pageSize,
            this.currentCategoryId)
            .subscribe(this.processResult())

    }

    addToCart(tempProduct:Product){
        this.cartService.addToCart(new CartItem(tempProduct))
    }
    
    processResult() {
        return data => {
            this.products = data._embedded.products;
            this.pageNumber = data.page.number + 1;
            this.pageSize = data.page.size;
            this.totalElemnets = data.page.totalElements;
        };
    }
    updatePageSize(pageSize:number){
        this.pageSize=pageSize
        this.pageNumber=1
        this.listProducts()
    }
}


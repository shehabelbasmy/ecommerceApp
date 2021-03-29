import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { FormService } from 'src/app/services/form.service';
import { FormValidator } from 'src/app/validators/form-validator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalQuantity: number = 0
  totalPrice: number = 0
  checkoutFormGroup: FormGroup

  creditCardMonths: number[]
  creditCardYears: number[]

  countries: Country[] = [];
  shippingAddressStates: State[] = []
  billingAddressStates: State[] = []

  constructor(private formBuilder: FormBuilder,private cartService:CartService, private formService: FormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required,Validators.minLength(2),FormValidator.notOnlyWhiteSpace]),
        lastName: new FormControl('',[Validators.required,Validators.minLength(2),FormValidator.notOnlyWhiteSpace]),
        email: new FormControl('',[Validators.required,Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$')]),
      }),
      shippingAddress: this.formBuilder.group({
        country: new FormControl('',[Validators.required]),
        street: new FormControl('',[Validators.required,Validators.minLength(2),FormValidator.notOnlyWhiteSpace]),
        city: new FormControl('',[Validators.required,Validators.minLength(2),FormValidator.notOnlyWhiteSpace]),
        state: new FormControl('',[Validators.required]),
        zipCode: new FormControl('',[Validators.required,Validators.minLength(2),FormValidator.notOnlyWhiteSpace])
      }),
      billingAddress: this.formBuilder.group({
        country:new FormControl('',[Validators.required]),
        street: new FormControl('',[Validators.required,Validators.minLength(2),FormValidator.notOnlyWhiteSpace]),
        city: new FormControl('',[Validators.required,Validators.minLength(2),FormValidator.notOnlyWhiteSpace]),
        state: new FormControl('',[Validators.required]),
        zipCode: new FormControl('',[Validators.required,Validators.minLength(2),FormValidator.notOnlyWhiteSpace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('',[Validators.required]),
        nameOnCard: new FormControl('',[Validators.required,Validators.minLength(2),FormValidator.notOnlyWhiteSpace]),
        cardNumber: new FormControl('',[Validators.required,Validators.pattern('[0-9]{16}'),FormValidator.notOnlyWhiteSpace]),
        securityCode: new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}'),FormValidator.notOnlyWhiteSpace]),
        expirationMonth: new FormControl('',[Validators.required]),
        expirationYear: new FormControl('',[Validators.required]),
      })
    })
    this.getCreditCardYears()

    this.getcreditCardMonth()

    this.getCountries()

    this.cartService.totlaPrice.subscribe(
      data=>this.totalPrice=data
    )
    this.cartService.totlaQuantity.subscribe(
      data=>this.totalQuantity=data
    )
  }

  get firstName(){return this.checkoutFormGroup.get('customer.firstName')}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName')}
  get email(){return this.checkoutFormGroup.get('customer.email')}

  get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country')}
  get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state')}
  get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city')}
  get shippingAddressZipcode(){return this.checkoutFormGroup.get('shippingAddress.zipCode')}
  get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street')}
  
  get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country')}
  get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state')}
  get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city')}
  get billingAddressZipcode(){return this.checkoutFormGroup.get('billingAddress.zipCode')}
  get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street')}
  
  get creditCardType(){return this.checkoutFormGroup.get('creditCard.cardType')}
  get creditNameOnCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard')}
  get creditCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber')}
  get creditSecurityCode(){return this.checkoutFormGroup.get('creditCard.securityCode')}
  get creditExpirationMonth(){return this.checkoutFormGroup.get('creditCard.expirationMonth')}
  get creditExpirationYear(){return this.checkoutFormGroup.get('creditCard.expirationYear')}

  getcreditCardMonth() {
    const startMonth: number = new Date().getMonth() + 1
    this.formService.getCreditCardMonth(startMonth).subscribe(

      data => {
        this.creditCardMonths = data
      }
    )
  }

  getCreditCardYears() {
    this.formService.getCreditCardYears().subscribe(
      data => this.creditCardYears = data
    )
  }

  updateMonth(selectedYear: number) {

    const currentYear: number = new Date().getFullYear();
    let startMonth: number

    if (currentYear == selectedYear) {

      startMonth = new Date().getMonth() + 1
    }
    else {
      startMonth = 1
    }

    this.formService.getCreditCardMonth(startMonth).subscribe(
      data => {
        this.creditCardMonths = data
      }
    )

  }

  getCountries() {
    this.formService.getCountries().subscribe(
      data => {
        this.countries = data
      }
    )
  }

  getStates(formGroupName: string) {

    const countryCode = this.checkoutFormGroup.get(formGroupName).value.country.code

    this.formService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data
        }
        else{
          this.billingAddressStates=data
        }
      }
    )

  }
  copyShippingAddressToBillingAddress(event){

    if(event.target.checked){
      console.log(true)
      this.checkoutFormGroup.controls.billingAddress

        .setValue(this.checkoutFormGroup.controls.shippingAddress.value)

        this.billingAddressStates=this.shippingAddressStates

    }else{
      this.checkoutFormGroup.controls.billingAddress.reset()
      this.billingAddressStates=[]
    }
  }

  onSubmit() {
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched()
    }
  }

}

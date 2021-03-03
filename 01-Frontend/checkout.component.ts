import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { County } from 'src/app/common/county';
import { DreamShopFormService } from 'src/app/services/dream-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressCounties: County[] = [];
  billingAddressCounties: County[] = [];

  constructor(private formBuilder: FormBuilder,
              private dreamFormService: DreamShopFormService) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        county: [''],
        country: [''],
        postalCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        county: [''],
        country: [''],
        postalCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    // get current month
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);

    this.dreamFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    // get current year
    this.dreamFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    // get countries
    this.dreamFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data))
        this.countries = data;
      }
    );

  }

  copyShippingAddressToBillingAddress(event){

    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      this.billingAddressCounties = this.shippingAddressCounties;
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressCounties = [];
    }

  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }
    
    this.dreamFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

  }

  getCounties(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.dreamFormService.getCounties(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressCounties = data; 
        }
        else {
          this.billingAddressCounties = data;
        }

        // select first item by default
        formGroup.get('county').setValue(data[0]);
      }
    );
  }

  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("The shipping address country is: " + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("The shipping address county is: " + this.checkoutFormGroup.get('shippingAddress').value.county.name);
    console.log("The billing address country is: " + this.checkoutFormGroup.get('billingAddress').value.country.name);
    console.log("The billing address county is: " + this.checkoutFormGroup.get('billingAddress').value.county.name);
  }

}

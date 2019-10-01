import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { PaymentLoaderService } from '../services/payment-loader.service';
import { PaymentFormService } from '../services/payment-form.service';
import { PaymentFormValidatorsService } from '../services/payment-form-validators.service';
import { AbstractControl, FormGroup, NgForm } from '@angular/forms';
import { IPaymentFormInterface } from '../services/payment-form.interface';
import {  Observable, of } from 'rxjs';
import { PaymentEventComponent } from '../payment-event/payment-event.component';

@Component({
  selector: 'app-payment-form-container',
  templateUrl: './payment-form-container.component.html',
  styleUrls: ['./payment-form-container.component.scss'],
  providers: [
    PaymentFormService,
    PaymentFormValidatorsService,
    PaymentLoaderService
  ]
})
export class PaymentFormContainerComponent implements OnInit {

  get form(): FormGroup {
    return this.paymentFormService.form;
  }

  data: IPaymentFormInterface;

  constructor(
    private paymentLoaderService: PaymentLoaderService,
    private paymentFormService: PaymentFormService,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.data = DEMO_PAYMENT;
    console.log('data:' + JSON.stringify(this.data));
    this.paymentLoaderService.loadPaymentForEdit(DEMO_PAYMENT);
    const x = this.form.get('paymentEventDetail');
  }

  getData(id: string) {
      this.paymentService.
  }

  public cellClickHandler({ sender, rowIndex, columnIndex, dataItem, isEdited }) {
    if (!isEdited) {
        sender.editCell(rowIndex, columnIndex, this.paymentFormService.addPaymentEventItem(dataItem));
    }
  }

  public cellCloseHandler(args: any) {
    const { formGroup, dataItem } = args;

    if (!formGroup.valid) {
        // prevent closing the edited cell if there are invalid values.
        args.preventDefault();
    } else if (formGroup.dirty) {
      console.log('do something here - closing cell');
      //  this.editService.assignValues(dataItem, formGroup.value);
      //  this.editService.update(dataItem);
      //  this.cellClose.emit(args);
    }
  }


   async submit(data: IPaymentFormInterface) {

    if (!this.paymentFormService.isValid) {
      return;
    }



    // const order: IPizzaFormInterface = this.pizzaFormService.createPizzaOrderDto(data);

    alert(`Thanks a bunch...the pizza is on the way!`);

    // if (this.editMode) {
    //   // update api endpoint call
    // } else {
    //   // create api endpoint call
    // }
  }

}

import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, NgForm } from '@angular/forms';
import {  Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { IPaymentFormInterface } from './models/payment-form.model';
import { PaymentFormService } from './services/payment-form.service';
import { PaymentFormValidatorsService } from './services/payment-form-validators.service';
import { PaymentService } from './services/payment.service';

@Component({
  selector: 'app-payment-form-container',
  templateUrl: './payment-form-container.component.html',
  styleUrls: ['./payment-form-container.component.scss'],
  providers: [
    PaymentFormService,
    PaymentFormValidatorsService
  ]
})
export class PaymentFormContainerComponent implements OnInit {
  get form(): FormGroup {
    return this.paymentFormService.form;
  }

  data: IPaymentFormInterface;
  loading = true;
  id: number;

  constructor(
    private paymentFormService: PaymentFormService,
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => (this.id = +params['id']));
    this.getData(this.id);
  }

  getData(id: number) {
      this.paymentService.getById(id)
        .pipe(
            finalize(() => this.loading = false)
        )
        .subscribe(res => {
            this.data = res;
        });
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

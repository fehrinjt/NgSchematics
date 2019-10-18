import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { <%= classify(name)%> } from '../models/<%= camelize(name)%>.model';
import { <%= classify(name)%>FormService } from '../services/<%= camelize(name)%>-form.service';
import { <%= classify(name)%>FormValidatorService } from '../services/<%= camelize(name)%>-form-validator.service';

@Component({
  selector: 'app-<%= camelize(name)%>-form',
  templateUrl: './<%= camelize(name)%>-form.component.html',
  styleUrls: ['./<%= camelize(name)%>-form.component.scss'],
  providers: [
    <%= classify(name)%>FormService,
    <%= classify(name)%>FormValidatorService
  ]
})
export class <%= classify(name)%>FormComponent implements OnInit {
  @Input() isNew = false;
  @Input() saving = false;
  @Input() formGroup: FormGroup;
  @Input()
  set <%= camelize(name)%>(value: <%= classify(name)%>) {
    if (value) {
      this._<%= camelize(name)%> = value;
      this.patch();
    }
  }

  get <%= camelize(name)%>() {
    return this._<%= camelize(name)%>;
  }

  @Output() save: EventEmitter<<%= classify(name)%>> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  private _<%= camelize(name)%>: <%= classify(name)%>;

  get form(): FormGroup {
    return this.<%= camelize(name)%>FormService.form;
  }

  constructor(
    public <%= camelize(name)%>FormService: <%= classify(name)%>FormService
  ) { }

  ngOnInit() {
  }

  patch() {
    this.<%= camelize(name)%>FormService.patch(this._<%= camelize(name)%>);
  }

  submit(values: <%= classify(name)%>) {
    if (!this.<%= camelize(name)%>FormService.isValid) {
      return;
    }

    this.save.emit(values);
  }

  cancelForm() {
    this.cancel.emit();
  }
}

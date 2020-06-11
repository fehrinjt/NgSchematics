import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { <%= classify(name)%> } from '../models/<%= dasherize(name)%>.model';
import { <%= classify(name)%>FormService } from '../services/<%= dasherize(name)%>-form.service';
import { <%= classify(name)%>Service } from '../services/<%= dasherize(name)%>.service';
import { FormGroup } from '@angular/forms';
import { <%= classify(name)%>FormValidatorService } from '../services/<%= dasherize(name)%>-form-validator.service';

@Component({
  selector: 'app-<%= dasherize(name)%>-form',
  templateUrl: './<%= dasherize(name)%>-form.component.html',
  styleUrls: ['./<%= dasherize(name)%>-form.component.scss'],
  providers: [
    <%= classify(name)%>FormService,
    <%= classify(name)%>FormValidatorService
  ]
})
export class <%= classify(name)%>FormComponent implements OnInit {
  @Input() saving = false;
  @Input() loading = true;
  @Input() isNew = false;
  @Output() save: EventEmitter<<%= classify(name)%>> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  @Input()
  set <%= camelize(name)%>(value: <%= classify(name)%>) {
    if (value) {
      this._<%= camelize(name)%> = value;
      this.patch();
    }
  }
  get product() {
    return this._<%= camelize(name)%>;
  }

  private _<%= camelize(name)%>: <%= classify(name)%>;

  get form(): FormGroup {
    return this.<%= camelize(name)%>FormService.form;
  }

  constructor(
    private <%= camelize(name)%>FormService: <%= classify(name)%>FormService
  ) { }

  ngOnInit(): void {
  }

  submit(values: <%= classify(name)%>) {
    if (!this.<%= camelize(name)%>FormService.isValid) {
      return;
    }

    this.save.emit(values);
  }

  patch() {
    this.<%= camelize(name)%>FormService.patch(this._<%= camelize(name)%>);
  }

  cancelForm() {
    this.cancel.emit();
  }
}

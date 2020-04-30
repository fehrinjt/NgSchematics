import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { <%= classify(name)%> } from '../models/<%= camelize(name)%>.model';
import { <%= classify(name)%>FormService } from '../services/<%= camelize(name)%>-form.service';
import { <%= classify(name)%>Service } from '../services/<%= camelize(name)%>.service';
import { FormGroup } from '@angular/forms';
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

import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { <%= classify(name)%>FormValidatorsService } from './<%= dasherize(name)%>-form-validators.service';

@Injectable()
export class <%= classify(name)%>FormService {
  public form: FormGroup;

  constructor(
    private <%= camelize(name)%>ValidatorsService: <%= classify(name)%>FormValidatorsService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
        <% for (const ctl of form.controls) {%>
            <%= ctl.name%>: [null<% if(ctl.validation.required){%>, Validators.required<%} if(ctl.validation.minLength > 0){%>, Validators.minLength(<%= ctl.validation.minLength%>)<%}%>],
        <%}%>
    });
  }

  get isValid(): boolean {
    if (!this.form.valid) {
      this.<%= camelize(name)%>ValidatorsService.validateAllFormFields(this.form);
      return false;
    }

    return true;
  }
}

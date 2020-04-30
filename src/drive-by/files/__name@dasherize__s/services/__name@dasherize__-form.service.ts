import { Injectable } from '@angular/core';
import { <%= classify(name)%> } from '../models/<%= camelize(name)%>.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { <%= classify(name)%>FormValidatorService } from './<%= camelize(name)%>-form-validator.service';

@Injectable()
export class <%= classify(name)%>FormService {
  form: FormGroup;
  <%= camelize(name)%>Id: number;

  constructor(
    private fb: FormBuilder,
    private <%= camelize(name)%>FormValidatorService: <%= classify(name)%>FormValidatorService
  ) {
    this.form = this.fb.group({
      <%= camelize(name)%>Id: [null],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      description: [null, Validators.required],
      price: [null, Validators.required]
    });
   }

   get isValid(): boolean {
    if (!this.form.valid) {
      this.<%= camelize(name)%>FormValidatorService.validateAllFormFields(this.form);
      return false;
    }

    return true;
   }

   patch(<%= camelize(name)%>: <%= classify(name)%>) {
     this.<%= camelize(name)%>Id = <%= camelize(name)%>.<%= camelize(name)%>Id;

     this.form.patchValue({
       ...<%= camelize(name)%>
     });
   }
}

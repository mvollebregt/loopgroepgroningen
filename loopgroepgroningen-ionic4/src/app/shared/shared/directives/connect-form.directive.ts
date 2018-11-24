import {Directive, Input} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';

// https://medium.com/@amcdnl/reactive-angular-forms-with-ngrx-533a2f28c127
@Directive({selector: '[lgConnectForm]'})
export class ConnectFormDirective {

  @Input('lgConnectForm')
  set data(val: any) {
    if (val) {
      this.formGroupDirective.form.patchValue(val);
      this.formGroupDirective.form.markAsPristine();
    }
  }

  constructor(private formGroupDirective: FormGroupDirective) {
  }

}

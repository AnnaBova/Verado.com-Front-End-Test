import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[nicknameValidator]',
  providers: [
    {
      provide: NG_VALIDATORS, 
      useExisting: forwardRef(() =>NicknameValidatorDirective), 
      multi: true 
    }
  ]
})
export class NicknameValidatorDirective implements Validator {
  @Input('nicknameValidator') currentNickname
  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} {
    if(control.value && control.value.slice(1) === this.currentNickname) {
      return { nickname: true }
    }

    return null
  }

}

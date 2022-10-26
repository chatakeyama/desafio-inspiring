import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function onlyIntegerNumberValidator(): ValidatorFn | null {
  return (control: AbstractControl): ValidationErrors => {
    const isNumber = /^[0-9]+$/.test(control.value);
    return isNumber ? null : { notNumber: { value: control.value } };
  };
}

export function onlyNumberValidator(): ValidatorFn | null {
  return (control: AbstractControl): ValidationErrors => {
    const isNumber = /[+-]?([0-9]*[.|,])?[0-9]+/.test(control.value);
    return isNumber ? null : { notNumber: { value: control.value } };
  };
}

export function precoDescontoValidator(): ValidatorFn | null {
  return (control: AbstractControl): ValidationErrors => {
    const preco = control.get('preco')
    const precoDesconto = control.get('precoDesconto')
    if (preco.value && precoDesconto.value) {
      return (Number.parseFloat(precoDesconto.value) < Number.parseFloat(preco.value)) ? null : { precoDescontoMaior: { value: precoDesconto.value } }
    }
    return null
  }
}

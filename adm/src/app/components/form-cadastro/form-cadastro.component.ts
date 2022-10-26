import { OfertasService } from 'src/app/services/ofertas.service';
import { IOferta } from '../../interfaces/IOferta.interface';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { onlyNumberValidator, onlyIntegerNumberValidator, precoDescontoValidator } from '../../validators/ofertaFormValidators';
import { ErrorStateMatcher } from '@angular/material/core';

export class PrecoErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control && control.invalid && (control.dirty || control.touched) || form.errors?.precoDescontoMaior
  }
}

export class DefaultErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control && control.invalid && (control.dirty || control.touched)
  }
}
@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.scss']
})
export class FormCadastroComponent implements OnInit {

  precoErrorStateMatcher = new PrecoErrorStateMatcher()
  defaultErrorStateMatcher = new DefaultErrorStateMatcher()

  lojas = [
    { id: 1, nome: 'Epic' },
    { id: 2, nome: 'Origin' },
    { id: 3, nome: 'Steam' },
  ];

  oferta = {} as IOferta

  ofertaForm = new FormGroup({
    id: new FormControl(this.oferta.id, [Validators.required, onlyIntegerNumberValidator(), this.uniqueIdValidator()]),
    titulo: new FormControl(this.oferta.titulo, [Validators.required]),
    preco: new FormControl(this.oferta.preco, [Validators.required, Validators.min(0.1), onlyNumberValidator()]),
    precoDesconto: new FormControl(this.oferta.precoDesconto, [Validators.required, Validators.min(0.1), onlyNumberValidator()]),
    descricao: new FormControl(this.oferta.descricao),
    loja: new FormControl(this.oferta.loja, [Validators.required])
  }, { validators: precoDescontoValidator() })

  @Input() dataForm: IOferta

  constructor(private ofertaService: OfertasService) { }
  ngOnInit(): void {
    this.ofertaForm.patchValue(this.dataForm)

  }

  get id() { return this.ofertaForm.get('id') }
  get titulo() { return this.ofertaForm.get('titulo') }
  get preco() { return this.ofertaForm.get('preco') }
  get precoDesconto() { return this.ofertaForm.get('precoDesconto') }
  get descricao() { return this.ofertaForm.get('descricao') }
  get loja() { return this.ofertaForm.get('loja') }

  uniqueIdValidator(): ValidatorFn | null {
    return (control: AbstractControl): ValidationErrors => {
      const isUnique = this.ofertaService.isUniqueId(control.value)
      return isUnique ? null : { notUnique: { value: control.value } };
    };
  }

  onSubmit() {
    console.warn(this.ofertaForm.errors);
  }

}

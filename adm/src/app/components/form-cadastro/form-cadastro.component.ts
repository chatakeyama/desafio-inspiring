import { OfertasService } from 'src/app/services/ofertas.service';
import { IOferta } from '../../interfaces/IOferta.interface';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { onlyNumberValidator, onlyIntegerNumberValidator, precoDescontoValidator } from '../../validators/ofertaFormValidators';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertaModel } from 'src/app/models/oferta.model';
import { ToastrService } from 'ngx-toastr';

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

  isNewOferta: boolean
  idOferta: number

  constructor(private ofertaService: OfertasService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.ofertaForm.patchValue(this.dataForm)
    this.idOferta = this.route.snapshot.params['id']
    this.idOferta ? this.isNewOferta = false : this.isNewOferta = true
  }

  get id() { return this.ofertaForm.get('id') }
  get titulo() { return this.ofertaForm.get('titulo') }
  get preco() { return this.ofertaForm.get('preco') }
  get precoDesconto() { return this.ofertaForm.get('precoDesconto') }
  get descricao() { return this.ofertaForm.get('descricao') }
  get loja() { return this.ofertaForm.get('loja') }

  uniqueIdValidator(): ValidatorFn | null {
    return (control: AbstractControl): ValidationErrors => {
      if (this.isNewOferta) {
        const isUnique = this.ofertaService.isUniqueId(control.value)
        return isUnique ? null : { notUnique: { value: control.value } };
      }
      return null
    }
  }

  onSubmit() {
    const ofertaModel = new OfertaModel(this.ofertaForm.value)
    const success = this.isNewOferta ? this.ofertaService.createOferta(ofertaModel) : this.ofertaService.saveOferta(this.idOferta, ofertaModel)
    if (success) {
      this.toastr.success('Salvo com sucesso!');
      this.router.navigate(['/nossas-ofertas']);
    }else{
      this.toastr.error('Houve um erro e a oferta não foi salva. Tente novamente mais tarde. ');
    }
  }

}

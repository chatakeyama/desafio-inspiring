import { IOferta } from '../../interfaces/IOferta.interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.scss']
})
export class FormCadastroComponent implements OnInit {

  lojas = [
    { id: 1, nome: 'Epic' },
    { id: 2, nome: 'Origin' },
    { id: 3, nome: 'Steam' },
  ];

  oferta: IOferta

  ofertaForm = new FormGroup({
    id: new FormControl(),
    titulo: new FormControl(),
    preco: new FormControl(),
    precoDesconto: new FormControl(),
    descricao: new FormControl(),
    loja: new FormControl()
  })

  @Input() dataForm: IOferta

  constructor() { }
  ngOnInit(): void {
    this.ofertaForm.patchValue(this.dataForm)
  }

  get id() { return this.ofertaForm.get('id') }
  get titulo() { return this.ofertaForm.get('titulo') }
  get preco() { return this.ofertaForm.get('preco') }
  get precoDesconto() { return this.ofertaForm.get('precoDesconto') }
  get descricao() { return this.ofertaForm.get('descricao') }
  get loja() { return this.ofertaForm.get('loja') }

  onSubmit() {
    console.warn(this.ofertaForm.value);
  }

}

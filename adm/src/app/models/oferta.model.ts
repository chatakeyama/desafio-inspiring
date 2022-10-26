import { IOferta } from "../interfaces/IOferta.interface"

export class OfertaModel {
  id: number
  titulo: string
  preco: string
  precoDesconto: string
  descricao: string
  loja: string

  constructor(oferta: IOferta) {
    this.id = Number(oferta.id)
    this.titulo = oferta.titulo
    this.preco = oferta.preco
    this.precoDesconto = oferta.precoDesconto
    this.descricao = oferta.descricao
    this.loja = oferta.loja
  }
}
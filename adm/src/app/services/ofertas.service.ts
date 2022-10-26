import { Injectable } from '@angular/core';
import { IOferta } from '../interfaces/IOferta.interface';
import { OfertaModel } from '../models/oferta.model';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  private KEY = 'ofertas-game-tracker'

  constructor() { }

  getOfertas(): IOferta[] {
    return JSON.parse(localStorage.getItem(this.KEY))
  }

  getOfertaById(id: number): IOferta {
    const ofertas: IOferta[] = JSON.parse(localStorage.getItem(this.KEY))
    return ofertas.find((oferta) => oferta.id == id)
  }

  isUniqueId(id: number): boolean {
    const ofertas: IOferta[] = this.getOfertas()
    return !ofertas.some((oferta) => oferta.id == id)
  }

  saveOferta(idOferta: number, ofertaEdited: OfertaModel): boolean {
    const ofertasStorage = this.getOfertas()
    const ofertasWithoutObj = ofertasStorage.filter(ofertaObj => {
      return ofertaObj.id != idOferta
    })
    if (ofertasStorage.length == ofertasWithoutObj.length) {
      return false
    }
    const newOfertasStorage = [...ofertasWithoutObj, ofertaEdited]
    localStorage.removeItem('ofertas-game-tracker')
    localStorage.setItem("ofertas-game-tracker", JSON.stringify(newOfertasStorage));
    return true
  }

  createOferta(newOferta: OfertaModel): boolean {
    const newOfertasStorage = [...this.getOfertas(), newOferta]
    localStorage.setItem("ofertas-game-tracker", JSON.stringify(newOfertasStorage));
    return true
  }

}

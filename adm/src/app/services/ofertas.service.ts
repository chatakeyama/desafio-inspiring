import { Injectable } from '@angular/core';
import { IOferta } from '../interfaces/IOferta.interface';
import { OfertaModel } from '../models/oferta.model';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  private KEY = 'ofertas-game-tracker'

  constructor() { }

  getAll(): IOferta[] {
    return JSON.parse(localStorage.getItem(this.KEY))
  }

  getById(id: number): IOferta {
    const ofertas: IOferta[] = JSON.parse(localStorage.getItem(this.KEY))
    return ofertas.find((oferta) => oferta.id == id)
  }

  isUniqueId(id: number): boolean {
    const ofertas: IOferta[] = this.getAll()
    return !ofertas.some((oferta) => oferta.id == id)
  }

  save(idOferta: number, ofertaEdited: OfertaModel): boolean {
    const ofertasStorage = this.getAll()
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

  create(newOferta: OfertaModel): boolean {
    const newOfertasStorage = [...this.getAll(), newOferta]
    localStorage.setItem("ofertas-game-tracker", JSON.stringify(newOfertasStorage));
    return true
  }

}

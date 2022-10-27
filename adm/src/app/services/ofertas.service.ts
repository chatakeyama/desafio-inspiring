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
    return this.getAll().find((oferta) => oferta.id === id)
  }

  isUniqueId(id: number): boolean {
    return !this.getAll().some((oferta) => oferta.id === id)
  }

  save(originalId: number, ofertaEdited: OfertaModel): boolean {
    const ofertasStorage = this.getAll()
    const indexOferta = ofertasStorage.findIndex((oferta) => oferta.id === originalId)
    if (indexOferta) {
      ofertasStorage[indexOferta] = ofertaEdited
      localStorage.setItem("ofertas-game-tracker", JSON.stringify(ofertasStorage))
      return true
    }
    return false
  }

  create(newOferta: OfertaModel): boolean {
    const newOfertasStorage = [...this.getAll(), newOferta]
    localStorage.setItem("ofertas-game-tracker", JSON.stringify(newOfertasStorage));
    return true
  }

}

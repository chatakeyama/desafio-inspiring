import { Injectable } from '@angular/core';
import { IOferta } from '../interfaces/IOferta.interface';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  KEY = 'ofertas-game-tracker'

  constructor() { }

  getOfertas() {
    return JSON.parse(window.localStorage.getItem(this.KEY))
  }

  getOfertaById(id: number): IOferta {
    const ofertas: IOferta[] = JSON.parse(window.localStorage.getItem(this.KEY))
    return ofertas.find((oferta) => oferta.id == id)
  }

}

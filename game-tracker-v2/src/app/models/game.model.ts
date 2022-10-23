import { IOferta } from '../interfaces/IOferta.interface'
import { Converter } from '../utils/converter'

export class Game {
  title: string = ''
  salePrice: string = ''
  normalPrice: string = ''
  thumb: string = ''

  constructor(oferta: IOferta) {
    this.title = oferta.title
    this.salePrice = oferta.salePrice
    this.normalPrice = oferta.normalPrice
    this.thumb = oferta.thumb
  }

  getDiscount(): number {
    const normalPriceNumber = Converter.textToNumber(this.normalPrice)
    const salePriceNumber = Converter.textToNumber(this.salePrice)
    return this.calculateDiscount(normalPriceNumber, salePriceNumber)
  }

  private calculateDiscount(normalPrice: number, salePrice: number): number {
    if (salePrice < normalPrice) {
      return Math.round((normalPrice - salePrice) * 100 / normalPrice)
    }
    return 0
  }

  displayDiscount(): string {
    const discount = this.getDiscount()
    return discount === 100 ? 'GRÁTIS' : `${discount}%`
  }
}
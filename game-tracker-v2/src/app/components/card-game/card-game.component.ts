import { Component, Input, OnInit } from '@angular/core';

interface Oferta {
  title: string
  salePrice: string
  normalPrice: string
  thumb: string
}

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss']
})

export class CardGameComponent implements OnInit {

  @Input() oferta!: Oferta
  constructor() { }

  ngOnInit(): void { }

  calculateDiscount(oldValue: number, newValue: number): number {
    if (newValue < oldValue) {
      return Math.round((oldValue - newValue) * 100 / oldValue)
    }
    return 0
  }

  discount(oldValue: string, newValue: string): string {
    const oldValueNumber = this.convertTextToNumber(oldValue)
    const newValueNumber = this.convertTextToNumber(newValue)
    const discount = this.calculateDiscount(oldValueNumber, newValueNumber)
    return this.displayDiscount(discount)
  }

  displayDiscount(value: number): string {
    if (value === 100) {
      return "GRÁTIS"
    }
    return `${value}%`
  }

  convertTextToNumber(textNumber: string): number {
    return Number.parseFloat(textNumber.replace(',', '.'))
  }

}
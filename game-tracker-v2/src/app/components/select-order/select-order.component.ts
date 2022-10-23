import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IGameSortOption } from 'src/app/interfaces/IGameSortOption.interface';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-select-order',
  templateUrl: './select-order.component.html',
  styleUrls: ['./select-order.component.scss']
})
export class SelectOrderComponent implements OnInit {

  @Output() emitSortSelection = new EventEmitter()

  options: IGameSortOption[] = [
    { value: 'discount', text: '% de Desconto', sortCallback: this.sortByDiscount },
    { value: 'highest-price', text: 'Maior valor', sortCallback: this.sortByHighestPrice },
    { value: 'lowest-price', text: 'Menor valor', sortCallback: this.sortByLowestPrice },
    { value: 'title', text: 'Título', sortCallback: this.sortByTitle },
  ]

  constructor() { }

  ngOnInit(): void {
    this.emitSortSelection.emit(this.options[0])
  }

  onSelect = (event: Event): void => {
    const selectedValue = (event.target as HTMLInputElement).value
    const selectedOption = this.options.find((option) => option.value === selectedValue)
    this.emitSortSelection.emit(selectedOption)
  }

  sortByLowestPrice(gamesList: Game[]) {
    gamesList.sort((a, b) => {
      return Number.parseFloat(a.salePrice) - Number.parseFloat(b.salePrice)
    })
  }

  sortByHighestPrice(gamesList: Game[]) {
    gamesList.sort((a, b) => {
      return Number.parseFloat(b.salePrice) - Number.parseFloat(a.salePrice)
    })
  }

  sortByTitle(gamesList: Game[]) {
    gamesList.sort((a, b) => a.title.localeCompare(b.title))
  }

  sortByDiscount(gamesList: Game[]) {
    gamesList.sort((a, b) => {
      return b.getDiscount() - a.getDiscount()
    })
  }

}

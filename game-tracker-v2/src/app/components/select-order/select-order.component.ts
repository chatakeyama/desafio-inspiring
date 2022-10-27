import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { IGameSortOption } from 'src/app/interfaces/IGameSortOption.interface';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-select-order',
  templateUrl: './select-order.component.html',
  styleUrls: ['./select-order.component.scss']
})
export class SelectOrderComponent implements OnInit {

  @Output() emitSortSelection = new EventEmitter()
  @ViewChild('buttonSelect') buttonSelect!: ElementRef
  display = false
  options: IGameSortOption[] = [
    { value: 'discount', text: '% de Desconto', sortCallback: this.sortByDiscount },
    { value: 'highest-price', text: 'Maior valor', sortCallback: this.sortByHighestPrice },
    { value: 'lowest-price', text: 'Menor valor', sortCallback: this.sortByLowestPrice },
    { value: 'title', text: 'Título', sortCallback: this.sortByTitle },
  ]
  selectedOptionText: string = this.options[0].text

  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.emitSortSelection.emit(this.options[0])
    this.renderer2.listen("document", "click", event => {
      if (!event.target.matches('.dropdown__button, .dropdown__icon')) {
        this.display = false
      }
    });
  }

  onDropdownButtonClick(): void {
    this.display = !this.display
  }

  onSelectOption(value: string): void {
    this.display = !this.display
    const selectedOptionObj = this.options.find((option) => option.value === value)
    this.selectedOptionText = selectedOptionObj?.text || ''
    this.emitSortSelection.emit(selectedOptionObj)
  }

  sortByLowestPrice(gamesList: Game[]): void {
    gamesList.sort((a, b) => {
      return Number.parseFloat(a.salePrice) - Number.parseFloat(b.salePrice)
    })
  }

  sortByHighestPrice(gamesList: Game[]): void {
    gamesList.sort((a, b) => {
      return Number.parseFloat(b.salePrice) - Number.parseFloat(a.salePrice)
    })
  }

  sortByTitle(gamesList: Game[]): void {
    gamesList.sort((a, b) => a.title.localeCompare(b.title))
  }

  sortByDiscount(gamesList: Game[]): void {
    gamesList.sort((a, b) => {
      return b.getDiscount() - a.getDiscount()
    })
  }

}

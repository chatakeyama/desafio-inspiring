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

  ngOnInit(): void {}

}
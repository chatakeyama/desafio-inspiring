import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss']
})

export class CardGameComponent implements OnInit {

  @Input() game!: Game
  constructor() { }

  ngOnInit(): void { }

}
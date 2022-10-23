import { Component, OnInit } from '@angular/core';
import { IGameSortOption } from 'src/app/interfaces/IGameSortOption.interface';
import { Game } from 'src/app/models/game.model';
import { ofertas } from '../../data/ofertas';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  originalGames: Game[] = []
  filteredGames: Game[] = []

  constructor() { }

  ngOnInit(): void {
    this.originalGames = ofertas.map(oferta => new Game(oferta))
    this.filteredGames = this.originalGames
  }

  filterGames(searchText: string): void {
    if (searchText) {
      searchText = searchText.trim().toLowerCase()
      this.filteredGames = this.originalGames.filter(oferta => oferta.title.toLowerCase().includes(searchText))
    } else {
      this.filteredGames = this.originalGames
    }
  }

  sortGames(option: IGameSortOption) {
    option.sortCallback(this.filteredGames)
  }
}

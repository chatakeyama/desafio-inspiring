import { Component, OnInit } from '@angular/core';
import { IGameSortOption } from 'src/app/interfaces/IGameSortOption.interface';
import { Game } from 'src/app/models/game.model';
import { HttpGameService } from 'src/app/services/http-game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  originalGames: Game[] = []
  filteredGames: Game[] = []
  serverError: boolean = false
  games$: Observable<Game[]> = new Observable<Game[]>();
  loading: boolean = true

  constructor(private httpService: HttpGameService) { }

  ngOnInit() {
    this.getGamesFromServer()
  }

  getGamesFromServer(): void {
    this.loading = true
    this.httpService.getGamesList().subscribe({
      next: (response) => {
        this.originalGames = response
        this.filteredGames = response
      },
      error: () => {
        this.loading = false
        this.serverError = true
      },
      complete: () => { this.loading = false }
    })
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

import { Game } from "../models/game.model"

export interface IGameSortOption {
  value: string
  text: string
  sortCallback: (gamesList: Game[]) => void
}
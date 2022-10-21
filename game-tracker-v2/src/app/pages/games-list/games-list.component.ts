import { Component, OnInit } from '@angular/core';
import { IOferta } from 'src/app/interfaces/IOferta.interface';
import { ofertas } from '../../data/ofertas';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  ofertas: IOferta[] = ofertas;

  constructor() {}

  ngOnInit(): void {}
}

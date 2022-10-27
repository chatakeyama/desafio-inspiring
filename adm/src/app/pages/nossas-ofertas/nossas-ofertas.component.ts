import { Component, OnInit } from '@angular/core';
import { IOferta } from 'src/app/interfaces/IOferta.interface';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-nossas-ofertas',
  templateUrl: './nossas-ofertas.component.html',
  styleUrls: ['./nossas-ofertas.component.scss']
})

export class NossasOfertasComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titulo', 'preco', 'precoDesconto', 'edit'];
  dataSource: IOferta[];

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.dataSource = this.ofertasService.getAll()
  }

}

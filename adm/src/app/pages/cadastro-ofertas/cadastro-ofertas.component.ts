import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOferta } from 'src/app/interfaces/IOferta.interface';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-cadastro-ofertas',
  templateUrl: './cadastro-ofertas.component.html',
  styleUrls: ['./cadastro-ofertas.component.scss']
})
export class CadastroOfertasComponent implements OnInit {

  lojas = [
    { id: 1, nome: 'Epic' },
    { id: 2, nome: 'Origin' },
    { id: 3, nome: 'Steam' },
  ];

  oferta: IOferta = null
  title: string = 'Cadastro de ofertas'

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    if(id){
      this.oferta = this.ofertasService.getById(Number.parseInt(id))
      this.title = "Edição de oferta"
    }
  }

}

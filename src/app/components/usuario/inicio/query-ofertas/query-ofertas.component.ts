import { Component, OnInit } from '@angular/core';
import { UbicacionNegocioService } from '../../../../services/Ubicacion.Negocio.Service';
import { OfertasService } from '../../../../services/ofertas.service';

@Component({
  selector: 'app-query-ofertas',
  templateUrl: './query-ofertas.component.html',
  styleUrls: ['./query-ofertas.component.css']
})
export class QueryOfertasComponent implements OnInit {

  public ofertas: any[] = []
  constructor(
    private _ofertas: OfertasService
  ) { }

  ngOnInit() {
    // this._ofertas.getOfertasUsuario().then(data => {
    //   this.ofertas = data;
    // })

  }

}

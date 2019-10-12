import { Component, OnInit } from '@angular/core';
import { SuscripcionesService } from '../../../services/suscripciones.service';
import { OfertasService } from '../../../services/ofertas.service';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrls: ['./suscripciones.component.css']
})
export class SuscripcionesComponent implements OnInit {

  public suscripciones: any[]
  public actualizaciones: any[]
  public uid: string
  public recentOfers
  constructor(
    private _suscripciones: SuscripcionesService,
    private _ofertas: OfertasService
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('omlog'))
    this.uid = user.i
    this.querySuscrip(this.uid)
  }

  querySuscrip(id) {
    this._suscripciones.getSuscripByUser(id).then(docs => {
      this.suscripciones = docs.suscripciones
      this.actualizaciones = docs.actualizaciones
     })
  }

  getUpdates() {
    
  }

  

}

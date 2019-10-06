import { Component, OnInit } from '@angular/core';
import { OfertaModel } from '../../../../models/Oferta.Model';
import { OfertasService } from '../../../../services/ofertas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-previo-edit',
  templateUrl: './previo-edit.component.html',
  styleUrls: ['./previo-edit.component.css']
})
export class PrevioEditComponent implements OnInit {

  public oferta: OfertaModel
  public caducidad: Date
  public reg: Date
  constructor(
    private _ofertas: OfertasService,
    private router: Router
  ) { }

  ngOnInit() {
    var pend = JSON.parse(sessionStorage.getItem('pend'))
    if (pend){
      this.oferta = pend
      this.caducidad = new Date(this.oferta.oCaducidad)
      this.reg = new Date(this.oferta.oPublicado)
    } else {
      this.router.navigate(['/empresa/Dashboard'])
    }
  }

  onPost() {
    $("app-loading").fadeToggle()
    this.oferta.oCaducidad = this.caducidad
    this.oferta.oPublicado = this.reg
    // this._ofertas.updateOferta(this.oferta)
  }

}

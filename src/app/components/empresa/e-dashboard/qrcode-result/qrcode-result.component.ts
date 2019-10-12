import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../../../../services/ofertas.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioModel } from '../../../../models/Usuario.Model';
import { OfertaModel } from 'src/app/models/Oferta.Model';

@Component({
  selector: 'app-qrcode-result',
  templateUrl: './qrcode-result.component.html',
  styleUrls: ['./qrcode-result.component.css']
})
export class QrcodeResultComponent implements OnInit {

  public code: string
  public usuario: UsuarioModel
  public oferta: OfertaModel
  public status: string
  public result: any
  constructor(
    private _ofertas: OfertasService,
    private _ruta: ActivatedRoute
  ) {
    this.usuario = new UsuarioModel('', '', '', '')
    this.oferta = new OfertaModel('','','','','','','',[],new Date, new Date, [],0,0,0,'', false)
   }

  ngOnInit() {
    this._ruta.params.subscribe( async ruta => {
      this.code = ruta['code']

      var user = JSON.parse(localStorage.getItem('omlog'))
      this.result = await this._ofertas.canjeCode(this.code, user.m)
      this.status = this.result.status
      this.usuario = this.result.usuario as UsuarioModel
      this.oferta = this.result.oferta as OfertaModel
      $("app-loading").fadeToggle()
    })
  }

}

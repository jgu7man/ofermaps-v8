import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../../../services/ofertas.service';
import { OfertaModel } from '../../../models/Oferta.Model';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-ver-code',
  templateUrl: './ver-code.component.html',
  styleUrls: ['./ver-code.component.css']
})
export class VerCodeComponent implements OnInit {

  public usuario: any
  public idOferta: string
  public code: string
  public oferta: OfertaModel
  public empresa: any
  constructor(
    private auth: AuthService,
    private _route: ActivatedRoute,
    private _ofertas: OfertasService,
    private _empresa: EmpresaService,
  ) {
    this._route.params.subscribe( params => { this.idOferta = params['id']})
    this.oferta = new OfertaModel('','','','','','','',[], new Date,new Date,[],0,0,0,'', false)
   }

  async ngOnInit() {
    await this.auth.user$.pipe().subscribe( user =>{ 
      this.usuario = user 
      this._ofertas.checkOferta(this.idOferta, this.usuario.uid).then( res=> {
        this.code = res.code
        $("app-loading").fadeToggle()
      })
    });
    this._ofertas.getOneOferta(this.idOferta).then( res => {
      this.oferta = res.oferta
      this.oferta.oCaducidad = res.cad
      this._empresa.getEmpresaName(this.oferta.idEmpresa).then( res => {
        this.empresa = res
      })
    })
    
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { EmpresaModel } from '../../../models/Empresa.Model';
import { UbicacionNegocioModel } from '../../../models/ubicacion.negocio.model';
import { UbicacionNegocioService } from '../../../services/Ubicacion.Negocio.Service';
import { OfertasService } from '../../../services/ofertas.service';
import { AuthService } from '../../../services/auth.service';
import { SuscripcionesService } from '../../../services/suscripciones.service';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {
  iconMap = {
    iconCurrent: "../../../../assets/img/CurrentPosition20.png",
    iconUrl: "../../../../assets/img/iso20.png"
  };

  public idEmpresa: string;
  public empresa: EmpresaModel
  public ubicaciones: any
  public ofertas: any;
  public suscriptores: number;
  public usuario: any;
  constructor(
    private href: ActivatedRoute,
    private _empresa: EmpresaService,
    private _ubicacion: UbicacionNegocioService,
    private _ofertas: OfertasService,
    private _suscripciones: SuscripcionesService,
    public auth: AuthService,
    public router: Router
  ) { 
    this.href.params.subscribe( params => {
      this.idEmpresa = params['id']
    })
    this.empresa = new EmpresaModel('','','','','','','','','',[])
  }

  ngOnInit() {
    this.getEmpresa()
    var user = JSON.parse(localStorage.getItem('omlog'))
    if (!user) {
      this.router.navigate(['/'])
    }
  }

  getEmpresa(){
    this._empresa.getEmpresa(this.idEmpresa).then( res =>{
      this.empresa = res
      this.getUbicacion();
      this.getOfertas();
      this.getNumSuscriptores();
      $("app-loading").fadeToggle()
    })
  }

  getUbicacion(){
    this._ubicacion.getUbicacionesByEmpresa(this.idEmpresa).then( res => {
      this.ubicaciones = res;
    })
  }

  getOfertas(){
    this._ofertas.getOfertasEmpresa(this.idEmpresa).then( res => {
      this.ofertas = res;
    })
  }

  getNumSuscriptores(){
    this._empresa.getNumSusc(this.idEmpresa).then(res => {
      this.suscriptores = res
    })
  }

  suscribir(){
    this.auth.user$.pipe().subscribe( user => {
      this.usuario = user
      this._suscripciones.suscribir(this.idEmpresa, this.usuario.displayName, this.usuario.email, this.usuario.uid)
    })
  }

}

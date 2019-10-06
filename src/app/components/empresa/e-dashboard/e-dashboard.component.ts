import { Component, OnInit } from "@angular/core";
import { UbicacionEmpresa } from "../../../models/Ubicacion.Empresa.model";
import { EmpresaModel } from "../../../models/Empresa.Model";
import { EmpresaService } from '../../../services/empresa.service';
import { OfertasService } from '../../../services/ofertas.service';
import { AuthService } from '../../../services/auth.service';
import { PlanesServicio } from '../../../services/planes.service';

@Component({
  selector: "app-e-dashboard",
  templateUrl: "./e-dashboard.component.html",
  styleUrls: ["./e-dashboard.component.css"]
})
export class EDashboardComponent implements OnInit {
  public empresa: EmpresaModel;
  public usuario: any;
  public nueva: boolean = true;
  public crear: boolean;
  public today: Date
  public vence: any
  // public idEmpresa: any;

  constructor(
    private _empresa: EmpresaService,
    private _ofertas: OfertasService,
    private auth: AuthService,
    private _plan: PlanesServicio
  ) {
    this.empresa = new EmpresaModel('', '', '', '', '', '', '', '', '', [])
    this.today = new Date
  }
  
  async ngOnInit() {
    if (window.screen.width >= 700) {
      this.crear = true;
      this.nueva = false;
      this.openMenu();
    }

    this.usuario = JSON.parse(localStorage.getItem('omlog'));

    this.empresa = await this._empresa.getEmpresa(this.usuario.m) 
    this.vence = await this._plan.getPlanActual(this.usuario.m)
    if (this.vence != 'gratis') {
      console.log('el plan no es gratis');
      if (this.today > this.vence) {
        console.log('el plan ya caducó');
        this._plan.setPlanGratis(this.usuario.m)
      } else {
        console.log('plan aun no vence');
      }
    } else {
      console.log('el plan es gratis');
    }
    // media query's

    
  }

  

  openMenu() {
    $("#menu").toggleClass("menu-open");
  }
}

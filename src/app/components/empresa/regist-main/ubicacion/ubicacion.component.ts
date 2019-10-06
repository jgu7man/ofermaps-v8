import { Component, OnInit } from "@angular/core";
import { UbicacionEmpresa } from "../../../../models/Ubicacion.Empresa.model";
import { Route, Params, Router } from '@angular/router';
import { UbicacionNegocioService } from '../../../../services/Ubicacion.Negocio.Service';

@Component({
  selector: "app-ubicacion",
  templateUrl: "./ubicacion.component.html",
  styleUrls: ["./ubicacion.component.css"]
})
export class UbicacionComponent implements OnInit {
  public ubicacion: UbicacionEmpresa = new UbicacionEmpresa("","","","","","",'','');

  constructor(
    private _ubicacion: UbicacionNegocioService,
    private _router: Router
  ) {
    
  }

  ngOnInit() {
    var ubi = JSON.parse(sessionStorage.getItem('ubi'));
    if (ubi != null){
      this.ubicacion = ubi;
    }
  }

  onSubmit() {
    $("app-loading").toggle()
    this._ubicacion.saveUbicacion(this.ubicacion)
    sessionStorage.removeItem('ubi');
    this._router.navigate(['/empresa/Dashboard'])
  }
}

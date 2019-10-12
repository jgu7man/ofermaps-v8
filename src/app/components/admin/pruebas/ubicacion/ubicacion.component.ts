import { Component, OnInit } from "@angular/core";
import { UbicacionEmpresa } from "../../../../models/Ubicacion.Empresa.model";
import { Route, Params, Router } from '@angular/router';
import { UbicacionNegocioService } from '../../../../services/Ubicacion.Negocio.Service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MuestrasService } from '../../../../services/muestras.service';

@Component({
  selector: "app-ubicacion",
  templateUrl: "./ubicacion.component.html",
  styleUrls: ["./ubicacion.component.css"]
})
export class RegistUbicacionComponent implements OnInit {
  public ubicacion: UbicacionEmpresa = new UbicacionEmpresa("","","","","","",'','');

  empresas = []
  constructor(
    private fs: AngularFirestore,
    private _ubicacion: MuestrasService,
    private _router: Router
  ) {
    
  }

  async ngOnInit() {
    var ubi = JSON.parse(sessionStorage.getItem('ubi'));
    if (ubi != null){
      this.ubicacion = ubi;
    }

    var emps = await this.fs.collection('empresas_muestras').ref.get()
    emps.forEach(doc => {
      this.empresas.push(doc.data())
    })
  }

  onSubmit() {
    this._ubicacion.saveUbicacion(this.ubicacion)
    sessionStorage.removeItem('ubi');
    this.ubicacion = new UbicacionEmpresa("","","","","","",'','');
  }
}

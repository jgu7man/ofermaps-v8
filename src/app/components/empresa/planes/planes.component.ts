import { Component, OnInit } from '@angular/core';
import { PlanesServicio } from "../../../services/planes.service";
import { PlanModel } from "../../../models/Planes.model";
import { UbicacionNegocioService } from 'src/app/services/Ubicacion.Negocio.Service';
import { EmpresaService } from '../../../services/empresa.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  planes:PlanModel[] = []
  public lat
  public long
  public zone
  public actual: string
  constructor(
    private _planes: PlanesServicio,
    private fs: AngularFirestore,
    private _ubicacion: UbicacionNegocioService,
    private _empresa: EmpresaService
  ) { 
   }

  ngOnInit() {
    var ses = JSON.parse(localStorage.getItem('omlog'))
    this.getPlanes(ses.z) 
    this.getPlanActual(ses.m)
  }
  
  getPlanes(pais) {
    this._planes.getPlanes(pais).then(planes => {
        this.planes = planes
      })
  }

  getPlanActual(idEmpresa) {
    this.fs.collection('empresas').ref
      .doc(idEmpresa).get().then(doc => {
      this.actual = doc.data().planActual
      })
  }

}

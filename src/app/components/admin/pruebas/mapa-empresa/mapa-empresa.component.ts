import { Component, OnInit } from "@angular/core";
// import {  } from "@types/googlemaps";
import { UbicacionNegocioService } from "../../../../services/Ubicacion.Negocio.Service";
import { UbicacionNegocioModel } from '../../../../models/ubicacion.negocio.model';
import { UbicacionEmpresa } from '../../../../models/Ubicacion.Empresa.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: "app-mapa-empresa",
  templateUrl: "./mapa-empresa.component.html",
  styleUrls: ["./mapa-empresa.component.css"]
})
export class RegistMapaEmpresaComponent implements OnInit {
  public lat: any;
  public lng: any;
  public empUbi: UbicacionEmpresa
  constructor(
    private _ubicacion: UbicacionNegocioService,
    private _router: Router
    ) 
  {
    this.empUbi = new UbicacionEmpresa('','','','', '', '', '', '')
  }

  ngOnInit() {
    this.currentLocation();
  }

  currentLocation() {
    navigator.geolocation.getCurrentPosition(geo => {
      this.lat = geo.coords.latitude;
      this.lng = geo.coords.longitude;
      // this.lat = -33.6753244
      // this.lng = -54.209588
    });
  }

  getDireccion(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this._ubicacion.geoCoder(this.lat, this.lng).subscribe(res => {
      let direccion = res.results[0].formatted_address;
      let dir = direccion.split(',')
      this.empUbi.dCalleynum = dir[0]
      this.empUbi.dColonia = dir[1]
      this.empUbi.dCiudad = dir[2].slice(6)
      this.empUbi.dEstado = dir[3]
      this.empUbi.dPais = dir[4]
      this.empUbi.lat = this.lat
      this.empUbi.long = this.lng
      sessionStorage.setItem('ubi', JSON.stringify(this.empUbi))
      this._router.navigate(['/admin/regist/ubicacion'])
    });
  }
}

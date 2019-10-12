import { Component, OnInit } from '@angular/core';
import { UbicacionNegocioService } from '../../../services/Ubicacion.Negocio.Service';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../../../services/ofertas.service';
import {ILatLng} from '../../../directives/directions.directive'

@Component({
  selector: 'app-direction-map',
  templateUrl: './direction-map.component.html',
  styleUrls: ['./direction-map.component.css']
})
export class DirectionMapComponent implements OnInit {

  public latOrigin: number;
  public lngOrigin: number;
  public latDest: number
  public lngDest: number
  public zone: string;
  public idEmpresa
  origin: ILatLng = {
    latitude: 0,
    longitude: 0
  }
  destination: ILatLng  = {
    latitude: 0,
    longitude: 0
  }
  displayDirections = true;
  constructor(
    private _ruta: ActivatedRoute,
    private _ubicacion: UbicacionNegocioService,
    private _ofertas: OfertasService
  ) { }

  ngOnInit() {
    this.currentLocation()
    this._ruta.params.subscribe(params => {
      this.idEmpresa = params['id']
    })
  }
  
  currentLocation() {
    // $("app-loading").fadeToggle()
    navigator.geolocation.getCurrentPosition(geo => {
      this.origin.latitude = geo.coords.latitude;
      this.origin.longitude = geo.coords.longitude;
      $("app-loading").toggle()
      this.geoCode();
      
    },
    function error(msg) {
      alert('Por favor activa la Ubicación de tu navegador');
    });
  }
  
  geoCode(){
    this._ubicacion.geoPolitical(this.origin.latitude, this.origin.longitude).subscribe(res => {
      var arrayZone = res.results[0].formatted_address
      var splitZone = arrayZone.split(',')
      var sliceZone = splitZone[0].trim()
      this.zone = sliceZone
      this._ubicacion.getUbi_oferta(this.idEmpresa, this.zone).then(res => {
        this.destination.latitude = res[0].lat
        this.destination.longitude = res[0].long
      })
    });
  }

  iconMap = {
    iconCurrent: "../../../../assets/img/CurrentPosition20.png",
    iconUrl: "../../../../assets/img/iso20.png"
  };

}

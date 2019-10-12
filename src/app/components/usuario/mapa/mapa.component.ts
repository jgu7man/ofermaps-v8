import { Component, OnInit } from "@angular/core";
import { MapsService } from "src/app/services/maps.service";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { UbicacionNegocioModel } from "../../../models/ubicacion.negocio.model";
import { UbicacionNegocioService } from "../../../services/Ubicacion.Negocio.Service";
import { OfertasService } from '../../../services/ofertas.service';

export interface Ubicacion {
  idNegocio: string;
  nombre: string;
  lat: string;
  long: string;
  area: string;
}

@Component({
  selector: "app-mapa",
  templateUrl: "./mapa.component.html",
  styleUrls: ["./mapa.component.css"]
})
export class MapaComponent implements OnInit {
  iconMap = {
    iconCurrent: "../../../../assets/img/CurrentPosition20.png",
    iconUrl: "../../../../assets/img/iso20.png"
  };

  public ubicacionesNegocio: any = [];
  public ofertas: any;

  public lat: number;
  public lng: number;
  public zone: string;
  constructor(
    private _map: MapsService,
    private fs: AngularFirestore,
    private _ubicacion: UbicacionNegocioService,
    private _ofertas: OfertasService
    ) {
      
    }

  ngOnInit() {
    this.currentLocation();
  }

  currentLocation() {
    // $("app-loading").fadeToggle()
    navigator.geolocation.getCurrentPosition(geo => {
      this.lat = geo.coords.latitude;
      this.lng = geo.coords.longitude;
      $("app-loading").toggle()
      this.geoCode();
      
    },
    function error(msg) {
      alert('Por favor activa la Ubicación de tu navegador');
    });
  }
  
  geoCode(){
    this._ubicacion.geoCoder(this.lat, this.lng).subscribe( res=>{ 
      var splitZone = res.plus_code.compound_code.split(',')
      var sliceZone = splitZone[0].slice(8)
      this.zone = sliceZone
      this.ofertasPorCiudad();
    });
  }
  
  ofertasPorCiudad(){
    this._ubicacion.getForCiudad(this.zone).then(res => {
      this.ofertas = res
      if (res == []) {
        $("app-loading").fadeOut()
        $("no_ofers").toggle()
      } else {
        $("app-loading").fadeOut()
      }
    })


  }

  onClosePop() {
    $("no_ofers").toggle()
  }

  changeLocation(event) {
    $("app-loading").fadeToggle()
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.geoCode();
  }

  
}

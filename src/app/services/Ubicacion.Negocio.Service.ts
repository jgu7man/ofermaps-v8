import { Injectable } from "@angular/core";
import { UbicacionNegocioModel } from "../models/ubicacion.negocio.model";
import {AngularFirestore,AngularFirestoreCollection} from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UbicacionEmpresa } from '../models/Ubicacion.Empresa.model';

export interface Zone {
  lat: number,
  long: number
}

@Injectable({
  providedIn: "root"
})
export class UbicacionNegocioService {
  // public UbicacionesNegocio: AngularFirestoreCollection<Ubicacion>;
  // public ubicacion: Observable<ubicacionId>;
  public UbicacionNegocio: UbicacionNegocioModel;
  public ubicacion: any;
  public UbicacionesNegocios;
  public Key: string;
  public Collection: any = this.fs.collection('ubicaciones');
  public zone: Zone
  constructor(
    private fs: AngularFirestore, 
    private _http: HttpClient
    ) {
    this.Key = "AIzaSyCKJhx6bExBZmSv1XrmJH2P8eRxQuUkFBc";
    this.UbicacionNegocio = new UbicacionNegocioModel("", "", "", "", "");
    // this.Collection = this.fs.collection('ubicaciones');
    }

  async getNegocios() {
    await this.Collection.get().forEach(docs => {
        var ubicaciones = [];
        docs.forEach(doc => {
          ubicaciones.push(doc.data());
        });
        this.UbicacionesNegocios = ubicaciones;
      });

    return this.UbicacionesNegocios;
  }

  async getForCiudad(zone) {
    var ubicaciones = []

    var sinAcentos = zone
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
      .normalize();
    var sinEspacios = sinAcentos.trim()
    var sinMayus = sinEspacios.toLowerCase()
    var ciudad = sinMayus

    console.log(ciudad);

    await this.Collection.ref.where('dCiudad', '==', ciudad).get().then(docs => {
      docs.forEach(async doc => {

        var ofers = await this.fs.collection('ofertas').ref.where('idEmpresa', '==', doc.data().idEmpresa).get()
        ofers.forEach(ofer => {
            console.log(ofer.data());
            ubicaciones.push({
              oferId: ofer.id,
              oferName: ofer.data().oNombre,
              oferLat: doc.data().lat,
              oferLong: doc.data().long,
              oferImg: ofer.data().oImagen
            })
          })
        
        var ofers_m = await this.fs.collection('ofertas_muestras').ref.where('idEmpresa', '==', doc.data().idEmpresa).get()
        ofers_m.forEach(ofer => {
            ubicaciones.push({
              oferId: ofer.id,
              oferName: ofer.data().oNombre,
              oferLat: doc.data().lat,
              oferLong: doc.data().long,
              oferImg: ofer.data().oImagen
            })
          })
      })
    })
    return ubicaciones
  }

  async getUbi_oferta(idEmpresa,zone){
    var ubicacion: any;
    await this.Collection.ref.where('idEmpresa', '==', idEmpresa).get().then( doc => {
        doc.forEach( doc => {
          ubicacion = doc.data()
        })
    })
    return ubicacion
  }

  async getUbicacionesByEmpresa(idEmpresa: string){
    await this.fs.collection('ubicaciones').ref
      .where('idEmpresa', '==', idEmpresa).get().then(docs => {
      
      var ubicaciones = [];
      docs.forEach( doc => {
        ubicaciones.push(doc.data())
      })
        
      this.UbicacionesNegocios = ubicaciones
      })
    
    return this.UbicacionesNegocios
  }

  geoCoder(lat: number, lng: number): Observable<any> {
    return this._http.get(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + this.Key);
  }

  saveUbicacion(ubicacion: UbicacionEmpresa) {
    var user = JSON.parse(localStorage.getItem('omlog'))
    var sinAcentos = ubicacion.dCiudad
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
      .normalize();
    var sinEspacios = sinAcentos.trim()
    var sinMayus = sinEspacios.toLowerCase()

    this.Collection.add({
      idEmpresa: user.m,
      dCalleynum: ubicacion.dCalleynum,
      dColonia: ubicacion.dColonia,
      dCiudad: sinMayus,
      dEstado: ubicacion.dEstado,
      dPais: ubicacion.dPais,
      lat: ubicacion.lat,
      long: ubicacion.long
    }).then(ref =>{})
  }


}

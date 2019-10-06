import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tarjeta } from "../models/Tarjeta.Model";

@Injectable()
export class TarjetaService {

  constructor() { }

  tarjeta:Tarjeta[] = [
    {
      tBanco: 'Santander',
      tNombre: 'Marco Antonio Solis Echeverría',
      tNumero: '4444333322221234',
      tMes: '12',
      tYear: '22',
      tCVC: '333',
      tEmisor: '../../../../../assets/img/oficons/master-grad.png',
      facEmail: 'marcosolis@marco.com',
      facTel: '5512345678',
      facRFC: 'SOMA640106HGF'
    }
  ]
  

  getTarjeta(): Observable<Tarjeta[]> {
    return of(this.tarjeta);
  }
}

export interface Tarjeta {
  tBanco: string,
  tNombre: string,
  tNumero: string,
  tMes: string,
  tYear: string,
  tCVC: string,
  tEmisor: string,

  facEmail: string,
  facTel: string,
  facRFC: string,
}



import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PostAdmin } from "../models/Admin.Empresa.Model";

@Injectable({
  providedIn: 'root'
})
export class AdminEmpresaService {

  constructor( private _http: HttpClient) { }


  registrar( admin: PostAdmin): Observable<any> {
    let params = JSON.stringify(admin);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post('https://polar-fortress-63181.herokuapp.com/empresa/register', params, {headers: headers});
  }
}

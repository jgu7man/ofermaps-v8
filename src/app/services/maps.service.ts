import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MapsService {

    constructor(
        private http: HttpClient,
    ){
    }
    

    getUbicacion(){
        
    }

    public lat: number;
    public long: number;
    currentLocation(){
        navigator.geolocation.getCurrentPosition( geo => {
            this.lat = geo.coords.latitude;
            this.long = geo.coords.longitude
        })
    }
}
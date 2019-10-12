import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { UserInterface } from "../models/user.model";
import { AngularFireAuth } from '@angular/fire/auth';
import { UbicacionNegocioService } from './Ubicacion.Negocio.Service';
import { AlertaService } from './alertas.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>

  public lat;
  public long;
  public zone;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private _ubicacion: UbicacionNegocioService,
    private _alerta: AlertaService
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap( user => {
        if (user) {
          return this.afs.doc<UserInterface>(`usuarios/${user.uid}`).valueChanges()
        } else {
          return of(null);
        }
      })
    )
  }
  
  async googleSingIn(){
     $("app-loading").toggle()
     try {
       const provider = new auth.GoogleAuthProvider();
     const credential = await this.afAuth.auth.signInWithPopup(provider);
     return this.updateUserData(credential.user)
     } catch (error) {
       
     }
  }
  
  async facebookSingIn(){
     $("app-loading").toggle()
     try {
        const provider = new auth.FacebookAuthProvider();
        const credential = await this.afAuth.auth.signInWithPopup(provider);
        return this.updateUserData(credential.user)
     } catch (error) {
       this._alerta.sendAlerta(error)
     }
   }

   async singOut(){
     await this.afAuth.auth.signOut();
     localStorage.removeItem('omlog')
     return this.router.navigate(['/']);
   }

   private async updateUserData({uid, email, displayName, photoURL}: UserInterface){
     const userRef: AngularFirestoreDocument<UserInterface> = this.afs.doc(`usuarios/${uid}`);
     const data = { uid, email, displayName, photoURL }
     userRef.set(data, { merge: true })
     
    navigator.geolocation.getCurrentPosition(geo => {
      this.lat = geo.coords.latitude;
      this.long = geo.coords.longitude;

      this._ubicacion.geoCoder(this.lat, this.long).subscribe(res => {
        var splitZone = res.plus_code.compound_code.split(',')
        var sliceZone = splitZone[splitZone.length - 1]
        var trimZone = sliceZone.trim()
  
        this.afs.doc(`usuarios/${uid}`).set({
          zone: trimZone
        }, { merge: true })

        localStorage.setItem('omvisited','visited')

      });

    },
    function error(msg) {
      alert('Por favor activa la Ubicación de tu navegador');
    });
     
     $("app-loading").toggle()
     return this.router.navigate(['/inicio']);
   }
}

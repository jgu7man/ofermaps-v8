import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { UbicacionNegocioService } from '../../services/Ubicacion.Negocio.Service';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Session {
  m: string,
  z: string,
  i: string,
}

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  
    public lat
    public long
    public admin = true
    public log: Session
  constructor(
    private fs: AngularFirestore,
    private router: Router,
  ) { }

  ngOnInit() {
    var log = JSON.parse(localStorage.getItem('omlog'))
    
    if (!log) {
      this.router.navigate(['/inicio'])
    } else if (!log.m) {
      this.fs.collection('usuarios').ref.doc(log.i).get().then(doc => {
        if (doc.data().idEmpresa) {
              this.log.m = doc.data().idEmpresa
              this.log.i = log.i
              this.log.z = log.z
              this.setStorage()
            } else {
              this.router.navigate(['/inicio'])
              return
            }
          })
          // revisar si tiene activado los tutoriales
        } else  {
          this.fs.collection('usuarios').ref.doc(log.i)
            .collection('tutoriales').doc('empresa').get().then(doc => {
              // revisar si ya vió el tutorial de esta seccion
              if (!doc.exists) {
                this.router.navigate(['/empresa/tutorial'])
                // si ya lo vió, revisar si lo tiene activado
              } else if( doc.data().value == false ){
                this.router.navigate(['/empresa/tutorial'])
              } else {
    
              }
            })
    }
  }

  getEmp(uid) {
      this.fs.collection('usuarios').ref.doc(uid).get().then(doc => {
        if (doc.data().admin == true) {
          this.log.m = doc.data().idEmpresa
          this.setStorage()
          }
      })
  }

  setStorage() {
    localStorage.setItem('omlog', JSON.stringify({
      u: this.log.i,
      z: this.log.z,
      e: this.log.m,
      }))
  }

}

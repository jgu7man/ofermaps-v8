import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public query: boolean = false
  public usuario: any;
  public admin
  constructor(
    private router: Router,
    private auth: AuthService,
    private fs: AngularFirestore
  ) {}

  ngOnInit() {
    this.auth.user$.pipe().subscribe(async user => {
      // revisar si está autenticado
      if (!user) {
        this.router.navigate(['/'])
      } else {
        var usuario = await this.fs.collection('usuarios').ref.doc(user.uid).get()
        this.setLocalData(usuario.data())
        // revisar si ha visto los tutoriales
        if (!user.tutoriales) {
          var docs = await this.fs.collection('usuarios').ref.doc(user.uid).collection('tutoriales').get()
          // revisar si ya vio todos los tutoriales
          if (docs.size >= 3) {
            await this.fs.collection('usuarios').ref.doc(user.uid).update({ tutoriales: true })
            // revisar si el usuario tiene perfil de empresa
            this.setData(true)
          } else if (docs.size == 0) {
            this.router.navigate(['/inicio/tutorial'])
            this.setData( false)
          } else {
            // Revisar si ya vio el tutorial de inicio
            var tutoInicio = docs.docs.find(doc => doc.id === 'inicio')
            if (tutoInicio.data().value == true) {
              // No redirigir
            } else {
              this.router.navigate(['/inicio/tutorial'])
            }
            // asigar false por que no ha visto TODOS los tutoriales
            await this.fs.collection('usuarios').ref.doc(user.uid).update({ tutoriales: false })
          }
          // asigar false por que no ha visto TODOS los tutoriales
            await this.fs.collection('usuarios').ref.doc(user.uid).update({ tutoriales: true })
          // revisar si el usuario tiene perfil de empresa
            this.setData(true)
        }
      }
    })
  }

  abrirQuery(){
    $("#queryBar").toggleClass('open');
    $("#queryIcon").toggleClass('down');
  }

  setLocalData(user) {
    if (user.idEmpresa) {
      this.admin = true
      localStorage.setItem('omlog', JSON.stringify({
        i: user.uid,
        z: user.zone,
        m: user.idEmpresa,
      }))
    } else {
      localStorage.setItem('omlog', JSON.stringify({
        i: user.uid,
        z: user.zone,
      }))
    }
  }

  setData( tutos) {
      localStorage.setItem('omdata', JSON.stringify({
        t: tutos,
        v: 'visited'
      }))
  }

  
}

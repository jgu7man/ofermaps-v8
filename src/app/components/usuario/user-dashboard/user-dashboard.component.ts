import { Component, OnInit } from '@angular/core';
import { UbicacionNegocioService } from '../../../services/Ubicacion.Negocio.Service';
import { OfertasService } from 'src/app/services/ofertas.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  public usuario: any;
  public ofertas: any = [];
  public query: boolean = false;
  public open: false
  constructor(
    public auth: AuthService,
    private _ofertas: OfertasService,
    private router: Router,
    private fs: AngularFirestore
  ) { 
    
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('omlog'));
    var data = JSON.parse(localStorage.getItem('omdata'));
    // revisar si tiene activado los tutoriales
    if (data.t == false ) {
      this.fs.collection('usuarios').ref.doc(this.usuario.i)
        .collection('tutoriales').doc('usuario').get().then(doc => {
          // revisar si ya vió el tutorial de esta seccion
          if (!doc.exists) {
            this.router.navigate(['/usuario/tutorial'])
            // si ya lo vió, revisar si lo tiene activado
          } else if( doc.data().value == false ){
            this.router.navigate(['/usuario/tutorial'])
          } else {

          }
        })
    }
    this.misOfertas(this.usuario.i);
  }

  misOfertas(idUser){
    this._ofertas.getOfertasUsuario(idUser).then(data => {
      this.ofertas = data;
    })
    
  }

  abrirQuery(){
      $("#queryBar").toggleClass('open');
      $("#queryIcon").toggleClass('down');
    }

  toggleMenu(){
    $("app-user-menu").slideToggle(100);
  }

}

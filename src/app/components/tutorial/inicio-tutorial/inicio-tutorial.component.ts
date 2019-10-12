import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-inicio-tutorial',
  templateUrl: './inicio-tutorial.component.html',
  styleUrls: ['./inicio-tutorial.component.css']
})
export class InicioTutorialComponent implements OnInit {

  constructor(
    private _ruta: ActivatedRoute,
    private router: Router,
    private fs: AngularFirestore,
    private auth: AuthService
  ) { }

  public user
  public tutorial: any
  public tuto: string
  ngOnInit() {
    var path = this._ruta.snapshot.pathFromRoot[1].routeConfig.path;
    this.tuto = path.split('/')[0]
    this.tutorial = this.tutoriales.find(tutorial => tutorial.tuto === this.tuto)
    this.auth.user$.pipe().subscribe(user => {
      this.user = user
    })
  }

  onTuto() {
    this.fs.collection('usuarios').ref.doc(this.user.uid)
      .collection('tutoriales').doc(this.tuto).set({
        tutorial: this.tuto,
        value: false
    })
  }

  offTuto() {
    this.fs.collection('usuarios').ref.doc(this.user.uid)
      .collection('tutoriales').doc(this.tuto).set({
        tutorial: this.tuto,
        value: true
      })
  }

  closeTuto() {
    this.router.navigate(['../'])
  }

  tutoriales = [
    {
      tuto: 'inicio',
      exit: '/inicio',
      messageH: 'Esto es un pequeño tutorial',
      messageD: 'Te mostraremos en sencillos pasos como usar esta aplicación. Puedes salir del tutorial en todo momento presionando la X o puedes dejar el tutorial presionando "SALIR DEL TUTORIAL"',
      next: 'step/mapa/1',
    },
    {
      tuto: 'usuario',
      exit: '/usuario',
      messageH: 'Esto es el panel de usuario',
      messageD: 'Si quieres conocer las funciones de esta sección, presiona SIGUIENTE',
      next: 'step/user/1',
    },
    {
      tuto: 'oferta',
      exit: '../../',
      messageH: 'Esto es la vista de una OFERTA',
      messageD: 'Si quieres conocer las funciones de esta sección, presiona SIGUIENTE',
      next: 'step/ofer/1',
    },
    {
      tuto: 'empresa',
      exit: '/empresa',
      messageH: 'Esto es un pequeño tutorial de empresa',
      messageD: 'Te mostraremos en sencillos pasos como usar la sección de empresa. Puedes salir del tutorial en todo momento presionando la X o puedes dejar el tutorial presionando "SALIR DEL TUTORIAL"',
      next: 'step/emp/1'
    },
  ]

}

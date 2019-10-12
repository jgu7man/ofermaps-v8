import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  constructor(
    private _ruta: ActivatedRoute,
    private router: Router,
    private fs: AngularFirestore
  ) { }

  public step
  public sec
  public next: boolean
  public tuto

  ngOnInit() {
    var path = this._ruta.snapshot.pathFromRoot[1].routeConfig.path;
    this.tuto = path.split('/')[0]
    this._ruta.params.subscribe(ruta => {
      var rutaSec = ruta['sec']
      var rutaStep = parseInt(ruta['num'])
      this.sec = this.secs.find(sec => sec.sec === rutaSec)
      this.step = this.sec.steps.find(step => step.num === rutaStep )
    })
  }

  nextStep(next) {
    if (next == false) {
      var user = JSON.parse(localStorage.getItem('omlog'))
      this.fs.collection('usuarios').ref.doc(user.i)
        .collection('tutoriales').doc(this.tuto).set({
          tutorial: this.tuto,
          value: true
      })
      this.router.navigate([this.sec.exit])
    } else {
      // Do nothing
    }
  }

  closeTuto() {
    this.router.navigate(['../../../../'])
  }

  offTuto() {
    var user = JSON.parse(localStorage.getItem('omlog'))
    this.fs.collection('usuarios').ref.doc(user.i)
      .collection('tutoriales').doc(this.tuto).set({
        tutorial: this.tuto,
        value: true
    })
    this.router.navigate([this.sec.exit])
  }

  secs = [
    {
      sec: 'mapa',
      exit:'/inicio',
      steps: [
        {
          num: 1,
          message: 'Te encuentras donde está el ícono <img src="../../../assets/img/CurrentPosition20.png">',
          prev: '/inicio/tutorial',
          next: '../2',
          sig: true,
        },
        {
          num: 2,
          message: 'Deslízate por el mapa para encontrar estos íconos <img src="../../../assets/img/iso20.png">. Estos íconos representan las ofertas que están disponibles en tu ciudad. Si no encuentras ninguno, quiere decir que aún no hay ofertas en tu ciudad',
          prev: '../1',
          next: '../3',
          sig: true,
        },
        {
          num: 3,
          message: 'Puedes cambiarte de ciudad deslizandote por el mapa y dando click en la ciudad que desees ver si hay ofertas',
          prev: '../2',
          next: '../4',
          sig: true,
        },
        {
          num: 4,
          message: 'Da in click para ver una oferta en uno de estos íconos <img src="../../../assets/img/iso20.png">',
          prev: '../3',
          next: '../5',
          sig: true,
        },
        {
          num: 5,
          message: 'Podrás ver el título de la oferta y un botón que te llevará a ella',
          prev: '../4',
          next: '../6',
          sig: true,
        },
        {
          num: 6,
          message: 'Da click en <i class="fas fa-th-list"></i> para cambiar la vista y ver las ofertas de manera ordenada',
          prev: '../5',
          next: '../7',
          sig: true,
        },
        {
          num: 7,
          message: 'Da click en <i class="fas map-marked"></i> para volver a la vista del mapa',
          prev: '../6',
          next: '../8',
          sig: true,
        },
        {
          num: 8,
          message: 'Da click en <img width="16" src="../../../assets/img/oficons/up.png"> para ver tus suscripciones y las ofertas más recientes',
          prev: '../7',
          next: '../9',
          sig: true,
        },
        {
          num: 9,
          message: 'Puedes hacer una búsqueda en la parte superior de la pantalla, para encotrar ofertas, productos, ciudades o alguna empresa que te interese',
          prev: '../8',
          next: '../10',
          sig: true,
        },
        {
          num: 10,
          message: 'Da click en tu foto de perfil de la parte superior o en el ícono  <i class="fas fa-user-alt"></i>  de la barra de navegación de la parte inferior',
          prev: '../9',
          next: '',
          sig: false,
        }
      ]
    },
    {
      sec: 'user',
      exit:'/usuario',
      steps: [
        {
          num: 1,
          message: 'En este panel puedes ver las ofertas a las que te has suscrito. Verás una imagen pequeña de la oferta, el nombre y la fecha de caducidad para que no te la pierdas.',
          prev: '',
          next: '../2',
          sig: true,
        },
        {
          num: 2,
          message: 'Da click en <img width="16" src="../../../assets/img/oficons/up.png"> para ver las empresas a las que te has suscrito',
          prev: '../1',
          next: '../3',
          sig: true,
        },
        {
          num: 3,
          message: 'Da click en la imagen de la oferta o en el título para ver los detalles',
          prev: '../2',
          next: '../4',
          sig: true,
        },
        {
          num: 4,
          message: 'Para ver el código que se te proporcionó da click en el <i class="fas fa-qrcode"></i> para ver el código QR, la empresa dueña de la ofeta podrá escanearlo',
          prev: '../3',
          next: '../5',
          sig: true,
        },
        {
          num: 5,
          message: 'Para ver los detalles de la empresa da click en la imagen de perfil de la empresa',
          prev: '../4',
          next: '',
          sig: false,
        },
      ]
    },
    {
      sec: 'ofer',
      exit:'../../../../',
      steps: [
        {
          num: 1,
          message: 'Da click en la imagen para verla de tamaño ajustado',
          prev: '',
          next: '../2',
          sig: true,
        },
        {
          num: 2,
          message: 'Da click en <img width="16" src="../../../assets/img/oficons/up.png"> para ver los detalles de la oferta',
          prev: '../1',
          next: '../3',
          sig: true,
        },
        {
          num: 3,
          message: 'Para ver los detalles de la empresa da click en la imagen de perfil de la empresa',
          prev: '../2',
          next: '../4',
          sig: true,
        },
        {
          num: 4,
          message: 'Si deseas obtener un código-cupón para oferta, debes suscribirte en el botón suscribir',
          prev: '../3',
          next: '../5',
          sig: true,
        },
        {
          num: 5,
          message: 'Si no tenemos tu correo electrónico, sólo te lo pediremos una vez',
          prev: '../4',
          next: '',
          sig: false,
        },
      ]
    },
    {
      sec: 'emp',
      exit:'/empresa',
      steps: [
        {
          num: 1,
          message: 'Este es tu panel de empresa, aquí podrás crear, editar y postear ofertas, seguir sus rendimientos y ajustar el perfil de tu empresa',
          prev: '',
          next: '../2',
          sig: true,
        },
        {
          num: 2,
          message: 'Da click en  <i class="fas fa-bars"></i>  para ver el menú',
          prev: '../1',
          next: '../3',
          sig: true,
        },
        {
          num: 3,
          message: 'Recuerda que debes publicar ofertas con imagen para que tus clientes puedan verla en el mapa. Para crear una oferta da click en el ícono del menú <i class="fas fa-file-medical"></i>',
          prev: '../2',
          next: '../4',
          sig: true,
        },
        {
          num: 4,
          message: 'Tus clientes podrán ver los datos de tu empresa cuando vean tu oferta. Para editar tu perfil de empresa da clíck en <i class="fas fa-edit"></i>',
          prev: '../3',
          next: '../5',
          sig: true,
        },
        {
          num: 5,
          message: 'Si quieres saber donde se encuentra ubicada tu empresa en el mapa da clíck en <i class="fas fa-map-marked-alt"></i>',
          prev: '../4',
          next: '../6',
          sig: true,
        },
        {
          num: 6,
          message: 'Recuerda que tus clientes pueden solicitar un código QR para que tú hagas válida las ofertas que les ofreces. Si un cliente llega a ti para cajear el código. Solicítale que te muestre el código y tú podrás escanearlo con la herramienta <i class="fas fa-qrcode"></i>',
          prev: '../5',
          next: '../7',
          sig: true,
        },
        {
          num: 7,
          message: 'Si deseas saber el rendimiento de tus ofertas puedes dar click en una de ellas para ver el resumen, ahí también podrás editarla',
          prev: '../6',
          next: '',
          sig: false,
        },
      ]
    },
  ]

}

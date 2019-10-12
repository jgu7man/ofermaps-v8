import { Component, OnInit } from '@angular/core';
import { OfertaModel } from '../../../../models/Oferta.Model';
import { OfertasService } from '../../../../services/ofertas.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-previo',
  templateUrl: './previo.component.html',
  styleUrls: ['./previo.component.css']
})
export class PrevioComponent implements OnInit {

  public oferta: OfertaModel
  public caducidad: Date
  public reg: Date
  public plan: any
  public planRef: any
  constructor(
    private _ofertas: OfertasService,
    private router: Router,
    private fs: AngularFirestore
  ) {
    
  }

  async ngOnInit() {
    var user = JSON.parse(localStorage.getItem('omlog'))
    this.planRef = this.fs.collection('empresas').ref.doc(user.m)
      .collection('plan').doc('actual')
    var plan = await this.planRef.get()
    this.plan = plan.data()

    
    
    var pend = JSON.parse(sessionStorage.getItem('pend'))
    if (pend) {
      if (pend.oTipo == "") {
        this.router.navigate(['/empresa/crear-oferta/' + user.m])
      } else {
        this.oferta = pend
        this.caducidad = new Date(this.oferta.oCaducidad)
        this.reg = new Date(this.oferta.oPublicado)
      }
    } else {
      this.router.navigate(['/empresa/Dashboard'])
    }
    $("app-loading").fadeToggle()
  }

  onPost() {
    $("app-loading").fadeToggle()
    this.oferta.oCaducidad = this.caducidad
    this.oferta.oPublicado = this.reg
    this.planRef.get().then(doc => {
      if (doc.data().publicaciones == 0) {
        this.oferta.visible = false
        this._ofertas.saveOferta(this.oferta)
        
      } else {
        this.oferta.visible = true
        this._ofertas.saveOferta(this.oferta)
        this.planRef.update({
          publicaciones: doc.data().publicaciones - 1
        })
      }
    })
  }

}

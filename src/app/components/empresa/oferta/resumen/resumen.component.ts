import { Component, OnInit } from '@angular/core';
import { OfertaModel } from '../../../../models/Oferta.Model';
import { OfertasService } from '../../../../services/ofertas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  public oferta: OfertaModel
  public idOferta: string
  public codes
  public progress
  public canjes
  public caduc: boolean = false
  constructor(
    private _ofertas: OfertasService,
    private ruta: ActivatedRoute,
    private router: Router,
    private fs: AngularFirestore
  ) {
    this.oferta = new OfertaModel('','','','','','','',[],new Date, new Date, [], 0,0,0, '', false)
   }

  ngOnInit() {
    this.ruta.params.subscribe(params => {
      this.idOferta = params['id']
    })
    this._ofertas.getOneOferta(this.idOferta).then(res => {
      this.oferta = res.oferta
      this.oferta.oCaducidad = res.cad
      $("app-loading").toggle()
      this.progressBar()
      this.checkCad()
    })

  }

  progressBar() {
    var progress = this.oferta.oCodes * 100
    var negProgress = progress / this.oferta.oLimite
    this.progress = 100 - negProgress
    var widthProgress = this.progress.toString() + '%'
    $(".progresBar").css('width', widthProgress)

    var canjes = this.oferta.oCanjes * 100
    var negCanjes = canjes / this.oferta.oLimite
    this.canjes = 100 - negCanjes
    var widthCanjes = this.canjes.toString() + '%'
    $(".canjesBar").css('width', widthCanjes)
    
  }

  checkCad() {
    var today = new Date()
    var cad = this.oferta.oCaducidad

    if (cad < today) {
      this.caduc = true
    } else {
    }
  }

  toEdit() {
    sessionStorage.setItem('pend', JSON.stringify(this.oferta))
    this.router.navigate(['/empresa/edit-of'])
  }

  setVisible(e) {
    this.fs.collection('ofertas').ref.doc(this.idOferta).update({
      visible: e.target.checked
    })
  }

}

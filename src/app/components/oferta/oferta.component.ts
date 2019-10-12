import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../../services/ofertas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertaModel } from '../../models/Oferta.Model';
import { EmpresaService } from '../../services/empresa.service';
import  {QRcode}  from "../../../assets/js/qrcodes/qrcode";
import { AuthService } from '../../services/auth.service';
import { SuscripcionesService } from 'src/app/services/suscripciones.service';
import { AngularFirestore } from '@angular/fire/firestore';
declare var qrcode: any;

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {

  public oferta: OfertaModel
  public idOferta: string;
  public caducidad: any;
  public empresa: any;
  public user: any;
  public ofertaCheck: boolean;
  public code: string
  public idEmpresa
  public suscribed: any
  public caduca: boolean = false
  constructor(
    private _oferta: OfertasService,
    private _empresa: EmpresaService,
    private _route: ActivatedRoute,
    public auth: AuthService,
    private _suscripciones: SuscripcionesService,
    private router: Router,
    private fs: AngularFirestore
  ) {
    this.oferta = new OfertaModel('','','','',0,0,'',[], new Date,new Date,[],0,0,0,'', false)
    this.empresa = '';
  }
  
  async ngOnInit() {
    
    await this._route.params.subscribe( params => {
      this.idOferta = params['id']
    })

    await this._oferta.getOneOferta(this.idOferta).then(async res => {
      var today = new Date()
      this.oferta = res.oferta
      if(res.cad < today) { this.caduca = true}
      this.oferta.oCaducidad = res.cad
      this.idEmpresa = res.oferta.idEmpresa
      this.getEmpresa(this.idEmpresa)
      
      this.user = JSON.parse(localStorage.getItem('omlog'))
      var data = JSON.parse(localStorage.getItem('omdata'))

      if (data.t == false) {
        this.fs.collection('usuarios').ref.doc(this.user.i)
          .collection('tutoriales').doc('oferta').get().then(doc => {
            // revisar si ya vió el tutorial de esta seccion
            if (!doc.exists) {
              this.router.navigate([`oferta/${this.idOferta}/tutorial`])
              // si ya lo vió, revisar si lo tiene activado
            } else if (doc.data().value == false) {
              this.router.navigate([`oferta/${this.idOferta}/tutorial`])
            } else {
            }
          })
      }
        
        this._oferta.checkOferta(this.idOferta, this.user.i).then(res => {
          this.ofertaCheck = res.check;
          this.code = res.code
          if(res.check == true){
            $("#qrCode").css('display', 'block');
            $(".codeBtn").attr('disabled', 'disabled');
          } else {
            this._oferta.takeVista(this.idEmpresa, this.idOferta)
          }
          $("app-loading").fadeToggle()
        });

      this.suscribed = await this._suscripciones.checkSuscripcion(this.idEmpresa, this.user.i)
      

    }).catch(err => {
      console.log(err);
    })
  }

  getEmpresa(empId){
    this._empresa.getEmpresaName(empId).then( res => {
      this.empresa = res
    })
  }
  
  getCode() {
    this.auth.user$.pipe().subscribe(user => {
      this.user = user

      if (user.email == null || user.email == undefined) {

        $("app-pop-email").fadeToggle()
        
      } else {

        this._oferta.getCode(this.idOferta, this.user.uid).then(
          res => {
            this.code = res
            $("#qrCode").slideToggle()
            $(".codeBtn").attr('disabled', 'disabled');
            this.suscribir();
          }
        );
      }


    })

  }

  catchCode(code) {
    this.code = code
    $("#qrCode").slideToggle()
    $(".codeBtn").attr('disabled', 'disabled');
    this.suscribir();
  }

  suscribir() {
    this.auth.user$.pipe().subscribe(user => {
      this.user = user
      this._suscripciones.suscribir(this.oferta.idEmpresa, this.user.displayName, this.user.email, this.user.uid)
    });
  }

  // zoom(){
  //   $("#imgOferta").toggleClass('zoomInOut')
  // }

}

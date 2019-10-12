import { Component, OnInit } from "@angular/core";
import { OfertaModel } from "../../../../models/Oferta.Model";
import { OfertasService } from '../../../../services/ofertas.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { MuestrasService } from '../../../../services/muestras.service';

@Component({
  selector: "app-crear-oferta",
  templateUrl: "./crear-oferta.component.html",
  styleUrls: ["./crear-oferta.component.css"]
})
export class CrearOfertaPruebaComponent implements OnInit {
  public oferta: OfertaModel;
  public ofertaBack: OfertaModel[];
  public condsList = [];
  public drop: boolean = true;
  public tipo: any;
  public condiciones: string[];
  public condicion: string;
  public oCaducidad: any;
  public keyword: string
  public open: string;
  public tipoOferta: any;
  public img: any;
  public plan: any
  public planRef: any
  public idEmprsa: string
  public maxCodes: number = 1000
  public edit
  public hasImage: boolean = false

  constructor(
    private _muestra: MuestrasService,
    private fs: AngularFirestore,
    private ruta: ActivatedRoute,
    private router: Router
  ) {
    this.oferta = new OfertaModel("",'', "", "", "", "", "",[],new Date, new Date, [], 0,0,0, "", false);
    this.condiciones = ["EJEMPLO: aplican restrincciones"];
    this.ruta.params.subscribe(params => {
      this.idEmprsa = params['idEmpresa']
    })
  }


  async ngOnInit() {
    this.oferta.idEmpresa = this.idEmprsa
    
    
    var pend = JSON.parse(sessionStorage.getItem('pend'))
    
    if (pend) {
      this.oferta = pend
      this.edit = true
      if (pend.oImagen != "") {
        this.hasImage = true
      }
    }

    
  }

  ofertaPendiente() {
    sessionStorage.setItem('pend', JSON.stringify(this.oferta))
    this.router.navigate(['/editor'])
  }

  agregarCondicion() {
    this.oferta.oCondiciones.push(this.condicion)
    this.condicion = ''
  }

  agregarKeyword() {
    this.oferta.keywords.push(this.keyword)
    this.keyword = ''
  }

  borrarCondicion(index){
    this.oferta.oCondiciones.splice(index)
  }

  borrarKeyword(index){
    this.oferta.keywords.splice(index)
  }

  toggle(tipo) {
    this.tipo = tipo
    $("#tipoOferta").text(this.tipo);
    $("#drop-list").scrollTop(0);
    this.oferta.oTipo = this.tipo;
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    } else {
      return null;
    }
  }

  getDate(event) {
  }

  openDrop() {
    $("drop-list").attr("class", "list-drop ofinput list-drop-open");
  }

  cargarImg(file: any){
    this.img = file.target.files[0]
  }
  
  onSubmit() {
    $("app-loading").fadeToggle()
      this._muestra.postOferta(this.oferta, this.img)
  }

  public tiposOferta: any[] = [
    { display: 'Descuento (%)', value: 'descuento' },
    { display: 'Bono (Dinero electrónico, etc)', value: 'bono' },
    { display: 'Gratis (Algo a regalar)', value: 'gratis' },
    { display: 'Equivalencia (2x1, 3x2...)', value: 'equivalencia' },
    
  ]
}

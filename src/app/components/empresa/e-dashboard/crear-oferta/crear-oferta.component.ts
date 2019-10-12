import { Component, OnInit } from "@angular/core";
import { OfertaModel } from "../../../../models/Oferta.Model";
import { OfertasService } from '../../../../services/ofertas.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "app-crear-oferta",
  templateUrl: "./crear-oferta.component.html",
  styleUrls: ["./crear-oferta.component.css"]
})
export class CrearOfertaComponent implements OnInit {
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
  public maxCodes: number
  public edit
  public hasImage

  constructor(
    private _oferta: OfertasService,
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

    // $("#create").scrollTop(-100);

    this.planRef = this.fs.collection('empresas').ref.doc(this.idEmprsa)
      .collection('plan').doc('actual')
    this.plan = await this.planRef.get()
    this.maxCodes = this.plan.data().codigos
    
    // $('.datepicker').on('mousedown',function(event){
    //   event.preventDefault();
    // })
    // $('.datepicker').pickadate({
    //   selectMonths: true, // Creates a dropdown to control month
    //   selectYears: 15, // Creates a dropdown of 15 years to control year,
    //   today: 'Today',
    //   clear: 'Clear',
    //   close: 'Ok',
    //   closeOnSelect: false // Close upon selecting a date,
    //   container: undefined, // ex. 'body' will append picker to body
    // });
  }

  ofertaPendiente() {
    sessionStorage.setItem('pend', JSON.stringify(this.oferta))
    // sessionStorage.setItem('design', JSON.stringify())
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
      this._oferta.postOferta(this.oferta, this.img).then(res => {
        this.planRef.update({ codigos: this.maxCodes - this.oferta.oLimite })
        this.router.navigate(['empresa/previo'])
      })
  }

  public tiposOferta: any[] = [
    { display: 'Descuento (%)', value: 'descuento' },
    { display: 'Bono (Dinero electrónico, etc)', value: 'bono' },
    { display: 'Gratis (Algo a regalar)', value: 'gratis' },
    { display: 'Equivalencia (2x1, 3x2...)', value: 'equivalencia' },
    
  ]
}

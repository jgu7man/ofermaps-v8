import { Component, OnInit } from '@angular/core';
import { OfertaModel } from '../../../../models/Oferta.Model';
import { OfertasService } from '../../../../services/ofertas.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-oferta',
  templateUrl: './editar-oferta.component.html',
  styleUrls: ['./editar-oferta.component.css']
})
export class EditarOfertaComponent implements OnInit {

  public oferta: OfertaModel;
  public ofertaBack: OfertaModel[];
  public condsList = [];
  public drop: boolean = true;
  public dcto: boolean = false;
  public bono: boolean = false;
  public gratis: boolean = false;
  public equi: boolean = false;
  public tipo: any;
  public condiciones: string[];
  public condicion: string;
  public keyword: string
  public open: any;
  public tipoOferta: any;
  public img: any;
  public plan: any
  public idEmprsa: string
  public maxCodes: number

  constructor(
    private _oferta: OfertasService,
    private fs: AngularFirestore,
    private ruta: ActivatedRoute,
    private router: Router
  ) {
    this.oferta = new OfertaModel("",'', "", "", "", "", "",[],new Date, new Date, [], 0,0,0, "", false);
    // this.ruta.params.subscribe(params => {
    //   this.idEmprsa = params['id']
    // })
  }

  ngOnInit() {
    var pend = JSON.parse(sessionStorage.getItem('pend'))
    if (pend) {
      this.oferta = pend
    }
    // this.oferta.idEmpresa = this.idEmprsa
    this.fs.collection('empresas').ref.doc(this.oferta.idEmpresa)
      .collection('plan').get().then(res => {
      this.maxCodes = res.docs[0].data().codigos
    })
    
    

    // $("#create").scrollTop(0);
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

  toggle(event) {
    this.tipo = event.target.innerText;
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

  openDrop() {
    $("drop-list").attr("class", "list-drop ofinput list-drop-open");
  }

  cargarImg(file: any){
    this.img = file.target.files[0]
  }
  
  onEdit() {
    $("app-loading").fadeToggle()
    this._oferta.postOferta(this.oferta, this.img).then(res => {
      this.router.navigate(['empresa/previo-edit'])
    })
  }

}

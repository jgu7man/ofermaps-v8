import { Component, OnInit, Input, } from '@angular/core';
import { OfertasService } from '../../../../services/ofertas.service';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-tus-ofertas',
  templateUrl: './tus-ofertas.component.html',
  styleUrls: ['./tus-ofertas.component.css']
})
export class TusOfertasComponent implements OnInit {

  public ofertasEmpresa : any;
  @Input() idEmpresa: any;
  public oferVacio: boolean = true;
  constructor(
    private _ofertas: OfertasService
  ) {}
  
  ngOnInit() {
    this.getOfertasEmpresa()
  }

  getOfertasEmpresa() {
    this._ofertas.getOfertasEmpresa(this.idEmpresa)
    .then( res =>{
      if (res.length > 0) {
        this.oferVacio = false
      }

      this.ofertasEmpresa = res;
      $("app-loading").fadeToggle()
    })
  }

}

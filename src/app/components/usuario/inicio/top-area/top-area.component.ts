import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsuarioModel } from '../../../../models/Usuario.Model';
import { AuthService } from '../../../../services/auth.service';
import { BusquedaService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-top-area',
  templateUrl: './top-area.component.html',
  styleUrls: ['./top-area.component.css']
})
export class TopAreaComponent implements OnInit {

  @Input() usuario: any
  
  public word: string
  public byProducto: any[]
  public byEmpresa: any[]
  constructor(
    public auth: AuthService,
    private _busqueda: BusquedaService
  ) { }

  ngOnInit() {
    
  }

  viewMode(){
    $("#listaMode").fadeToggle();
    if($("#modeIcon").hasClass('fa-th-list')){
      $("#modeIcon").removeClass('fa-th-list')
      $("#modeIcon").addClass('fa-map-marked-alt')
    } else {
      $("#modeIcon").removeClass('fa-map-marked-alt')
      $("#modeIcon").addClass('fa-th-list')
    }
  }

  onSearch() {
    console.log('onSearch');
    this._busqueda.onSearch()
    this._busqueda.serachByProd(this.word)
    this._busqueda.searchByEmpresa(this.word)
    this._busqueda.searchByCategoriaEmpresa(this.word)
    this._busqueda.searchByCiudad(this.word)
  }

}

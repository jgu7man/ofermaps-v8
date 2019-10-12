import { Component, OnInit, Input } from '@angular/core';
import { BusquedaService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public menu: boolean = false;
  public suscripciones: boolean = false
  public busqueda: boolean = false
  @Input() admin = false

  SWIPE_ACTION = {UP: 'swipeup', DOWN: 'swipedown'}
  constructor(
    private _buscar: BusquedaService
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('omlog'))
    if (user.m) {
      this.admin = true
    } else {
      
    }
    this.onSearch()
  }

  swipe(swipe) {
    console.log(swipe);
    $("#navBar").toggleClass('open');
    $("#navIcon").toggleClass('down');
    $(".navbarContent").toggleClass('openContent');
    // $("#conten").toggleClass('opened');
    $(".icon i").toggle()
    if ($("#conten").hasClass('opened')) {
      this.suscripciones = false
    } else {
      this.suscripciones = true
    }
    this.busqueda = false
  }

  abrirMenu(){
    $("#navBar").toggleClass('open');
    $("#navIcon").toggleClass('down');
    $(".navbarContent").toggleClass('openContent');
    // $("#conten").toggleClass('opened');
    $(".icon i").toggle()
    if ($("#conten").hasClass('opened')) {
      this.suscripciones = false
    } else {
      this.suscripciones = true
    }
    this.busqueda = false
  }

  onSearch() {
    this._buscar.buscar.subscribe(res => {
      this.busqueda = res
      this.suscripciones = false
      $(".icon i").toggle()
      $("#navBar").toggleClass('open');
      $("#navIcon").toggleClass('down');
      $("#conten").toggleClass('opened');
      $("app-backbar").toggle()
    })
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ofer-navbar',
  templateUrl: './ofer-navbar.component.html',
  styleUrls: ['./ofer-navbar.component.css']
})
export class OferNavbarComponent implements OnInit {

  public admin = false
  menu: any
  @Input() idEmpresa
  constructor() { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('omlog'))
    if (user.m) {
      this.admin = true
    }
  }

  abrirMenu(){
    $("#navBar").toggleClass('open');
    $("#navIcon").toggleClass('down');
    $(".navbarContent").toggleClass('oferOpen');
    $(".icon i").toggle()
    $("app-backbar").toggle()
    // $("#oferInfo").toggleClass('oferOpen')
  }

  swipe(e) {
    $("#navBar").toggleClass('open');
    $("#navIcon").toggleClass('down');
    $(".navbarContent").toggleClass('oferOpen');
    $(".icon i").toggle()
    $("app-backbar").toggle()
  }

}

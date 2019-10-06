import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-e-navbar',
  templateUrl: './e-navbar.component.html',
  styleUrls: ['./e-navbar.component.css']
})
export class ENavbarComponent implements OnInit {
  public cerrar: boolean;
  public titulo: string

  constructor() { }

  ngOnInit() {

    this.mediaQuery();

    var tit = document.location.pathname;
    
    if (tit.includes('Dashboard')) {
      this.titulo = "TABLERO";
    }

    if (tit.includes('planes')) {
      this.titulo = "PLANES";
    }

    if (tit.includes('formadepago')) {
      this.titulo = "FORMA DE PAGO";
    }

    
    
  }
  
  mediaQuery() {
    if(window.screen.width >= 700) {
      $(".unlogIcon").text('CERRAR SESIÓN');
      $(".unlogIcon").css('font-size', '14px');
    }
  }
}

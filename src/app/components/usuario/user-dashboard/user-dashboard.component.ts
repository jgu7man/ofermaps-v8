import { Component, OnInit } from '@angular/core';
import { UbicacionNegocioService } from '../../../services/Ubicacion.Negocio.Service';
import { OfertasService } from 'src/app/services/ofertas.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  public usuario: any;
  public ofertas: any = [];
  public query: boolean = false;
  public open: false
  constructor(
    public auth: AuthService,
    private _ofertas: OfertasService
  ) { 
    
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('omlog'));
    this.misOfertas(this.usuario.i);
    this.setRandomColor();
  }

  misOfertas(idUser){
    this._ofertas.getOfertasUsuario(idUser).then(data => {
      this.ofertas = data;
      console.log(data);
    })
    
  }

  getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    
  setRandomColor() {
      $(".empresaIcon").css("background-color", this.getRandomColor());
    }
  
  abrirQuery(){
      $("#queryBar").toggleClass('open');
      $("#queryIcon").toggleClass('down');
    }

  toggleMenu(){
    $("app-user-menu").slideToggle(100);
  }

}

import { Component, OnInit } from '@angular/core';
// import { AuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from "ng4-social-login";
import { AuthService } from "../../services/auth.service";
import { UsuarioModel } from '../../models/Usuario.Model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { UbicacionNegocioService } from '../../services/Ubicacion.Negocio.Service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public slider: boolean;
  public botones;
  // public user:any = SocialUser;
  public Usuario: UsuarioModel;
  public zone

  constructor(
    // private _socialAuth: AuthService,
    public auth: AuthService,
    private _Usuario: UsuarioService,
    private router: Router,
    private _ubicacion: UbicacionNegocioService
  ) { 
    this.Usuario = new UsuarioModel('', '', '', '')
    var data = localStorage.getItem('omdata')
    var sVisited = sessionStorage.getItem('omvisited')
    if (window.screen.width <= 700) { // 768px portrait
      $("app-aviso").toggle()
      if (!data && !sVisited) {
        router.navigate(['slider'])
      }
    } 
     
   }

  ngOnInit() {
    this.mediaQuery();
    this.getUbication()
    this.auth.user$.pipe().subscribe(user => {
      if (user) {
        this.router.navigate(['/inicio'])
      }
    });
  }

  mexico = `../../../assets/img/colima.png`
  uruguay = `../../../assets/img/montevideo2.png`
  

  getUbication() {
    navigator.geolocation.getCurrentPosition(geo => {
      var lat = geo.coords.latitude;
      var long = geo.coords.longitude;

      this._ubicacion.geoCoder(lat, long).subscribe(res => {
        var splitZone = res.plus_code.compound_code.split(',')
        var sliceZone = splitZone[splitZone.length - 1]
        var trimZone = sliceZone.trim()


        if (trimZone == 'México') {
          this.zone = this.mexico
        } else {
          this.zone = this.uruguay
        }
  
      },
        function error(msg) {
          alert('Por favor activa la Ubicación de tu navegador');
        });
    });
  }

  mediaQuery(){
    if (window.screen.width >= 700) { // 768px portrait
      this.slider = true;
    }
    if (window.screen.width <= 700) {
      $("app-aviso").hide()
      this.botones = document.querySelector("#botones");
      this.botones.setAttribute('class', 'col s12' );
    }
  }

    public pos: number;
    buckuno() {
      $("#buck1").attr("class",'buck buck-active');
      $("#buck2").attr("class",'buck');
      $("#buck3").attr("class",'buck');
      $(".slide").css("transform", "translateX(0%)")
      this.pos = 0;
    }

    buckdos() {
      $("#buck1").attr("class",'buck');
      $("#buck2").attr("class",'buck buck-active');
      $("#buck3").attr("class",'buck');
      $(".slide").css("transform", "translateX(-100%)");
      this.pos = 100
    }

    bucktres() {
      $("#buck1").attr("class",'buck');
      $("#buck2").attr("class",'buck');
      $("#buck3").attr("class",'buck buck-active');
      $(".slide").css("transform", "translateX(-200%)");
      this.pos = 200
    }

    
    
}

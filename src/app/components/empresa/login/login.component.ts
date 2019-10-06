import { Component, OnInit } from '@angular/core';
import { LoginEmpresas } from '../../../models/Login.Empresas.Model';
// import { AuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from "ng4-social-login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // public user:any = SocialUser;
  public loginEmpresa: LoginEmpresas;

  public pwd = document.getElementById('contrasena');
  public eye = document.getElementById('eye');

  constructor(
    // private _socialAuth: AuthService,
    private router: Router,
  ) { 
    this.loginEmpresa = new LoginEmpresas('', '', false);
   }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('omlog'))
    if (user) {
      this.router.navigate(['/inicio'])
    }
  }

  goLogin(){
    // this._socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID)
    //   .then((userData) => {
    //     this.user = userData;
    //     // this.login();
    //   })
  }

  login(){
    
  }

  see() {
    // this.eye.classList.toggle('active');
    this.pwd.toggleAttribute('type="text"');
  }

  onSubmit() {
  }

}

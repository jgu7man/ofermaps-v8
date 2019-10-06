import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public query: boolean = false
  public usuario: any;
  public admin
  constructor(
    private router: Router,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.auth.user$.pipe().subscribe(user => {
      if (!user) {
        this.router.navigate(['/'])
      } else if (user.idEmpresa) {
        this.admin = true
        localStorage.setItem('omlog', JSON.stringify({
          i: user.uid,
          z: user.zone,
          m: user.idEmpresa,
        }))
      } else {
        localStorage.setItem('omlog', JSON.stringify({
          i: user.uid,
          z: user.zone,
        }))
      }
    })
  }

  abrirQuery(){
    $("#queryBar").toggleClass('open');
    $("#queryIcon").toggleClass('down');
  }

  
}

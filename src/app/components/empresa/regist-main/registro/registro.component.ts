import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { AdminEmpresa, PostAdmin } from '../../../../models/Admin.Empresa.Model';
import { AdminEmpresaService } from "../../../../services/admin.empresa.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  public adminEmpresa: AdminEmpresa;
  public PostAdmin: PostAdmin;
  constructor(
    private titleService: Title,
    private _postAdmin: AdminEmpresaService
  ) { 
    this.adminEmpresa = new AdminEmpresa('', '', '', '', false, false),
    this.PostAdmin = new PostAdmin('', '')
  }

  ngOnInit() {
    // (function() {
    //   $('input#contrasena, input#confcontrasena').characterCounter();
    // })
    this.titleService.setTitle('Ofermaps | Registro');
  }

  onSubmit() {
    this.PostAdmin.email = this.adminEmpresa.email;
    this.PostAdmin.password = this.adminEmpresa.contrasena;

    this._postAdmin.registrar(this.PostAdmin).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log(<any>error);
      }
    )
    
    
    // window.location.href = 'registmain/personalizar'
  }

  

}

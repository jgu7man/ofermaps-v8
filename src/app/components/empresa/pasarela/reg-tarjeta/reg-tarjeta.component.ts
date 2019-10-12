import { Component, OnInit } from '@angular/core';
import { Tarjeta } from '../../../../models/Tarjeta.Model';
import { format } from 'util';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reg-tarjeta',
  templateUrl: './reg-tarjeta.component.html',
  styleUrls: ['./reg-tarjeta.component.css']
})
export class RegTarjetaComponent implements OnInit {

  public tarjeta:Tarjeta;
  public emisor:any;
  public card = [/\d/, /\d/, /\d/, /\d/,  ' ', /\d/, /\d/, /\d/, /\d/,  ' ',/\d/, /\d/, /\d/, /\d/,  ' ',/\d/, /\d/, /\d/, /\d/,  ' ']


  constructor(
    private _location: Location
  ) { 
    this.tarjeta = new Tarjeta('','', '', '', '', '', '', '', '', '')
   }

  ngOnInit() {

    this.setEmisor();
  }

  public amex:boolean
public visa:boolean
public master:boolean

  setEmisor(){
        var emi:any
      $('#tNumero').focusout( ()=> {
          emi = $('#tNumero').val();
          this.amex = emi.startsWith("3");
          this.visa = emi.startsWith("4");
          this.master = emi.startsWith("5");


          if( this.amex ) {
            this.tarjeta.tEmisor = "../../../../../assets/img/oficons/amex-black.png";
            $("#emisorImg").attr('src', "../../../../../assets/img/oficons/amex-black.png");
            
          } 
          
          if ( this.visa ) {
            this.tarjeta.tEmisor = "../../../../../assets/img/oficons/visa-black.png";
            $("#emisorImg").attr('src', "../../../../../assets/img/oficons/visa-black.png");
            
          } 
          
          if ( this.master ) {
            this.tarjeta.tEmisor = "../../../../../assets/img/oficons/master-black.png";
            $("#emisorImg").attr('src', "../../../../../assets/img/oficons/master-black.png")
            
          } 

          
        })
        
        



  }


  onSubmit() {
    // window.location.href = 'empresa/pasarela/formadepago'
    this._location.go('/empresa/pasarela/formadepago')
  }

}

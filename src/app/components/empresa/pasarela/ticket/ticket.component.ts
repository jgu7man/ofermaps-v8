import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { PlanesServicio } from "../../../../services/planes.service";
import { TarjetaService } from "../../../../services/tarjeta.service";

import { PlanModel } from "../../../../models/Planes.model";
import { Tarjeta } from "../../../../models/Tarjeta.Model";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  public id:any;
  public today:any;
  public onemonth:any;
  public plan:PlanModel;
  public tarjeta:Tarjeta[] = [];

  constructor(

    private ruta:ActivatedRoute,
    private _plan:PlanesServicio,
    private _tarjeta:TarjetaService,

  ) { }

  ngOnInit(): void {
    this.getPlan();
    this.getTarjeta();
    

    var today:any = new Date();
    let dd = today.getDate(),
        mm = today.getMonth() + 1,
        mmmm = today.getMonth() + 2,
        dia = String(dd).padStart(2, '0'),
        mes = String(mm).padStart(2, '0'),
        masunmes = String(mmmm).padStart(2, '0'),
        año = today.getFullYear();
    // var date:any = new Date()

    
    
    today = dia + '/' + mes + '/' + año;
    var unmes = dia + '/' + masunmes + '/' + año;
    
    
    this.today = today
    this.onemonth = unmes
  }


  getPlan(): void{
    // const id = +this.ruta.snapshot.paramMap.get('id');
    // this._plan.getPlan(id)
    //   .subscribe(plan => this.plan = plan);

    // this.id = id
  }

  getTarjeta(){
    this._tarjeta.getTarjeta()
      .subscribe(tarjeta => this.tarjeta = tarjeta)
  }

}

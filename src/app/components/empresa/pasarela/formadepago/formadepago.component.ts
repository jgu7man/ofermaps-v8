import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PlanesServicio } from '../../../../services/planes.service';
import { TarjetaService, Tarjeta } from '../../../../services/tarjeta.service';
import { PlanModel } from "../../../../models/Planes.model";
import { Formadepago } from '../../../../models/Formadepago.model';
// import { Tarjeta } from "../../../../models/Tarjeta.Model";

@Component({
  selector: 'app-formadepago',
  templateUrl: './formadepago.component.html',
  styleUrls: ['./formadepago.component.css']
})
export class FormadepagoComponent implements OnInit {

    public id:number;
    public card:any;
    public paypal:any;
    public plan: PlanModel
    public forma: Formadepago;
    public tarjeta:Tarjeta[];
    public hidenum: string;

  constructor(

    private ruta:ActivatedRoute,
    private _planes:PlanesServicio,
    private _tarjeta:TarjetaService,

  ) { 

    this.forma = new Formadepago('card');
    // this.tarjeta = new Tarjeta('', '')
    
    this.plan = new PlanModel(0,'','','',[],0,0,0,'')
    
  }
  
  
  ngOnInit(): void {
    this.getPlan();
    this.getTarjeta()
     
  }
  
  
  getPlan(){
    const id = +this.ruta.snapshot.paramMap.get('id');
    this._planes.getPlan(id)
      .then(plan => {
        this.plan = plan
      });
    
    this.id = id
  }
  
  getTarjeta(){
    this._tarjeta.getTarjeta()
    .subscribe(tarjeta => {
      this.tarjeta = tarjeta
    })
  }
  
  hide(num){
    var numTarjeta = num
    this.hidenum = numTarjeta.slice(12);
  }

  
  onSubmit() {
    this._planes.setNewPlan(this.id)
    // window.location.href = "empresa/pasarela/ticket/" + this.id
  }

}

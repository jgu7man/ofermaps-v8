import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from "@angular/router";
import { PlanesServicio } from '../../../services/planes.service';
import { PlanModel } from "../../../models/Planes.model";

@Component({
  selector: 'app-pasarela',
  templateUrl: './pasarela.component.html',
  styleUrls: ['./pasarela.component.css']
})
export class PasarelaComponent implements OnInit {


    public plan:PlanModel;
    // public formadepago: Formadepago;


  constructor(

    private ruta:ActivatedRoute,
    private _servicio:PlanesServicio

  ) { }

  ngOnInit():void {

    // this.getPlan();

  }

  // getPlan(): void{
  //   const id = +this.ruta.snapshot.paramMap.get('id');
  //   this._servicio.getPlan(id)
  //     .subscribe(plan => this.plan = plan)
  // }

}

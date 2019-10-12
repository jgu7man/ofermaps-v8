import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  constructor(
    private _ruta: ActivatedRoute
  ) { }

  public step
  public sec

  ngOnInit() {
    this._ruta.params.subscribe(ruta => {
      var rutaSec = ruta['sec']
      var rutaStep = parseInt(ruta['num'])

      this.sec = this.secs.find(sec => sec.sec === rutaSec)

      this.step = this.sec.steps.find(step => step.num === rutaStep )
    })
  }

  secs = [
    {
      sec: 'mapa',
      steps: [
        {
          num: 1,
          message: 'Te encuentras donde está el ícono <img src="../../../assets/img/CurrentPosition20.png">',
          prev: '/inicio/tutorial',
          next: '2',
        },
        {
          num: 2,
          message: 'Deslízate por el mapa para encontrar estos íconos <img src="../../../assets/img/iso20.png">',
          prev: '1',
          next: '3',
        }
      ]
    }
  ]

}

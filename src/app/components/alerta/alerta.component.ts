import { Component, OnInit } from '@angular/core';
import { AlertaService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {

  constructor(
    private _alerta: AlertaService
  ) { }

  public mensaje = "Error desconocido"

  ngOnInit() {
    this._alerta.setAlerta.subscribe(res => {
      if (res) {
        this.mensaje = res.message
        $("app-alerta").fadeToggle()
      }
    })
  }

  onClose() {
    $("app-alerta").fadeToggle()
  }

}

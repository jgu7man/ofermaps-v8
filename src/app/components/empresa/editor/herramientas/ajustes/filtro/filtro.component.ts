import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../../../../../services/editor.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  public bri: number;
  public con: number;
  public inv: number;
  public sat: number;
  public hu: number;
  public sep: number;
  public blu: number;
  public rot;
  constructor(private _Edit: EditorService) { }

  ngOnInit() {
  }

  rotate(){
    this._Edit.rotate(this.rot);
    $("#deg").text(this.rot);
  }

  filter(bri, con, inv, sat, hu, sep, blu){
    $(".seleccionado").css('filter', 'brightness('+bri+'%)'+' contrast('+con+'%)'+' invert('+inv+'%)'+' saturate('+sat+'%)'+' hue-rotate('+hu+'deg)'+' sepia('+sep+'%)'+' blur('+blu+'px)')
    this._Edit.historial()
  }

  brillo(bri: number){
    $(".seleccionado").css('filter', 'brightness(' + bri + '%)')
    this._Edit.historial()
  }

  contraste(con: number){
    $(".seleccionado").css('filter', 'contrast(' + con + '%)')
    this._Edit.historial()
  }

  invert(inv: number){
    $(".seleccionado").css('filter', 'greyscale(' + inv + '%)')
    this._Edit.historial()
  }

  saturation(sat: number){
    $(".seleccionado").css('filter', 'saturate(' + sat + '%)')
    this._Edit.historial()
  }

  hue(hu: number){
    $(".seleccionado").css('filter', 'hue-rotate(' + hu + 'deg)')
    this._Edit.historial()
  }

  sepia(sep: number){
    $(".seleccionado").css('filter', 'sepia(' + sep + '%)')
    this._Edit.historial()
  }

  blur(blu: number){
    $(".seleccionado").css('filter', 'blur(' + blu + 'px)')
    this._Edit.historial()
  }

  subirCapa(){
    this._Edit.subirCapa();
  }

  bajarCapa(){
    this._Edit.bajarCapa();
  }

  borrar(){
    this._Edit.borrar();
  }

}

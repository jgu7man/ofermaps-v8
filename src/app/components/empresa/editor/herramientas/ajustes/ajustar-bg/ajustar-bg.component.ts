import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../../../../../services/editor.service';

@Component({
  selector: 'app-ajustar-bg',
  templateUrl: './ajustar-bg.component.html',
  styleUrls: ['./ajustar-bg.component.css']
})
export class AjustarBgComponent implements OnInit {

  public X: number;
  public bri: number;
  public con: number;
  public inv: number;
  public sat: number;
  public hu: number;
  public sep: number;
  public blu: number;
  constructor(
    private editor: EditorService
  ) { }
  
  ngOnInit() {
  }

  ajustarX(X: number){
    $("#imagenFondo").css('right', X + '%')
    this.editor.historial()
  }

  filter(bri, con, inv, sat, hu, sep, blu){
    $("#imagenFondo").css('filter', 'brightness(' + bri + '%) contrast(' + con + '%) invert(' + inv + '%) saturate(' + sat + '%) hue-rotate(' + hu + 'deg) sepia(' + sep + '%) blur(' + blu + 'px)')
    this.editor.historial()
  }

  brillo(bri: number){
    $("#imagenFondo").css('filter', 'brightness(' + bri + '%)')
    this.editor.historial()
  }

  contraste(con: number){
    $("#imagenFondo").css('filter', 'contrast(' + con + '%)')
    this.editor.historial()
  }

  invert(inv: number){
    $("#imagenFondo").css('filter', 'greyscale(' + inv + '%)')
    this.editor.historial()
  }

  saturation(sat: number){
    $("#imagenFondo").css('filter', 'saturate(' + sat + '%)')
    this.editor.historial()
  }

  hue(hu: number){
    $("#imagenFondo").css('filter', 'hue-rotate(' + hu + 'deg)')
    this.editor.historial()
  }

  sepia(sep: number){
    $("#imagenFondo").css('filter', 'sepia(' + sep + '%)')
    this.editor.historial()
  }

  blur(blu: number){
    $("#imagenFondo").css('filter', 'blur('+blu+'px)')
    this.editor.historial()
  }

}

import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../../../../../services/editor.service';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-edit-box',
  templateUrl: './edit-box.component.html',
  styleUrls  : ['./edit-box.component.css']
})
export class EditBoxComponent implements OnInit {

  public rot: number;
  public hex: number;
  public shadow;
  public editor
  constructor( private _Edit: EditorService) { 
      this.shadow = {
        top: 0,
        left: 0,
        ext: 0,
        trans:0
      }
   }

   
  ngOnInit() {
      
  }

  rotate(){
    this._Edit.rotate(this.rot);
    $("#deg").text(this.rot);
  }

  changeComplete($event: ColorEvent){
    this._Edit.color($event.color.hex);
  }

  transparencia($event: ColorEvent){
    $(".seleccionado div").css('opacity', $event.color.rgb.a)
    this._Edit.historial()
  }

  sombra(){
    $(".seleccionado div").css('box-shadow',
      this.shadow.top+'px '+this.shadow.left+'px '+this.shadow.ext+'px rgba(0,0,0,0.'+this.shadow.trans+')'
    )
    this._Edit.historial()
  }

  

}

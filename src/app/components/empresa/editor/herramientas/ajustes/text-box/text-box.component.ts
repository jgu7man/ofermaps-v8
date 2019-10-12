import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../../../../../services/editor.service';
import { ColorEvent } from 'ngx-color';
import { Font } from 'ngx-font-picker';


@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {

  public rot: number;
  public hex: number;
  public shadow;
  public editor;
  public size: number;
  constructor( private editorService: EditorService) { 
      this.shadow = {
        top: 0,
        left: 0,
        ext: 0,
        trans:0
      }
   }

   public font: Font = new Font({
     family:'Lato',
   })

   
  ngOnInit() {
    
     
      
  }

  onListo() {
     var target = $(".intext").hasClass('seleccionado');
    if( target ) {
        $(".intext textarea").attr('disabled', 'disabled');
        $(".intext").removeClass('seleccionado');
        $(".textBox").slideToggle( );
        $("#cajaTextos").slideToggle();
      }
      this.editorService.historial()
  }

  rotate(){
    this.editorService.rotate(this.rot);
    $("#deg").text(this.rot);
  }

  changeComplete($event: ColorEvent){
    $(".seleccionado").css('color', $event.color.hex);
    this.editorService.historial()
  }

  transparencia($event: ColorEvent){
    $(".seleccionado textarea").css('opacity', $event.color.rgb.a)
    this.editorService.historial()
  }

  sombra(){
    $(".seleccionado textarea").css('text-shadow',
      this.shadow.top+'px '+this.shadow.left+'px '+this.shadow.ext+'px rgba(0,0,0,0.'+this.shadow.trans+')'
    )
    this.editorService.historial()
  }

  getFont($event){
    $(".seleccionado textarea").css('font-family', $event.family)
    this.editorService.historial()
  }

  sizing(size){
    $(".seleccionado textarea").css('font-size', size)
    this.editorService.historial()
  }

  subirCapa(){
    this.editorService.subirCapa();
  }

  bajarCapa(){
    this.editorService.bajarCapa();
  }

  borrar(){
    this.editorService.borrar();
  }

  aling(aling: string){
    $(".seleccionado textarea").css('text-align', aling);
    $(".aling").removeClass('formatSel');
    $("#"+aling).addClass('formatSel');
    this.editorService.historial()
  }

  bold(){
    $(".seleccionado textarea").toggleClass('bold');
    $("#bold").toggleClass('formatSel');
    this.editorService.historial()
  }

  italic(){
    $(".seleccionado textarea").toggleClass('italic');
    $("#italic").toggleClass('formatSel');
    this.editorService.historial()
  }

  upper(){
    $(".seleccionado textarea").toggleClass('upper');
    $("#upper").toggleClass('formatSel');
    this.editorService.historial()
  }

}

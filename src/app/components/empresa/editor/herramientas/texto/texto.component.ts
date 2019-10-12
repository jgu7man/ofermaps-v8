import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../../../../services/editor.service';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
  styleUrls: ['./texto.component.css']
})
export class TextoComponent implements OnInit {

  constructor(private editor: EditorService) { }

  ngOnInit() {
  }

  texto(){
    $("#espacio")
      .append('<div class="intext"><textarea  disabled placeholder="Escribe algo" class="texto"></textarea></div>');
    this.editor.historial()
  }

  h1(){
    $("#espacio")
      .append('<div class="intext"><textarea style="text-align: center" disabled placeholder="Escribe algo" class="texto h1"></textarea></div>');
    this.editor.historial()
  }

  h2(){
    $("#espacio")
      .append('<div class="intext"><textarea style="text-align: center" disabled placeholder="Escribe algo" class="texto h2"></textarea></div>');
    this.editor.historial()
  }

  h3(){
    $("#espacio")
      .append('<div class="intext"><textarea style="text-align: center" disabled placeholder="Escribe algo" class="texto h3"></textarea></div>');
    this.editor.historial()
  }

  legend(){
    $("#espacio")
      .append('<div class="intext"><textarea style="text-align: center" disabled placeholder="Escribe algo" class="texto legend"></textarea></div>');
    this.editor.historial()
  }

}



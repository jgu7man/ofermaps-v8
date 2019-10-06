import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../../../../services/editor.service';

@Component({
  selector: 'app-figuras',
  templateUrl: './figuras.component.html',
  styleUrls: ['./figuras.component.css']
})
export class FigurasComponent implements OnInit {



  constructor( private editor: EditorService) { }

  ngOnInit() {
  }

  Cuadro(){
    $("#espacio").append('<div class="elemento"><div class="cuadro"></div></div>');
    this.editor.historial()
  }

  CuadroBorde(){
    $("#espacio").append('<div class="elemento"><div class="cuadroBorde"></div></div>');
    this.editor.historial()
  }

  CuadroRadius(){
    $("#espacio").append('<div class="elemento"><div class="cuadroRadius"></div></div>');
    this.editor.historial()
  }

  circulo(){
    $("#espacio").append('<div class="elemento"><div class="circulo"></div></div>');
    this.editor.historial()
  }

  circuloRadius(){
    $("#espacio").append('<div class="elemento"><div class="circuloRadius"></div></div>');
    this.editor.historial()
  }

  

  



}

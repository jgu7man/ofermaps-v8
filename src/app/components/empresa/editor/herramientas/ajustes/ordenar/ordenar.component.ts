import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../../../../../services/editor.service';

@Component({
  selector: 'app-ordenar',
  templateUrl: './ordenar.component.html',
  styleUrls: ['./ordenar.component.css']
})
export class OrdenarComponent implements OnInit {

  constructor(private _Edit: EditorService) { }

  ngOnInit() {

    $("#copiar").click(()=> {
      var texto = $(".intext").hasClass('seleccionado');
      var figura = $(".elemento").hasClass('seleccionado');
      var imagen = $(".imagenEl").hasClass('seleccionado');
    if( texto || figura || imagen ) {
        $(".intext textarea").attr('disabled', 'disabled');
        $(".intext").removeClass('seleccionado');
        $(".elemento").removeClass('seleccionado');
        $(".imagenEl").removeClass('seleccionado');
        $(".textBox").slideUp( );
        $(".editBox").slideUp( );
        $(".filtroBox").slideUp( );
        $("#cajaTextos").slideDown();
        $("#cajaImagen").slideDown();
        $("#cajaCrear").slideDown();
      }
      this._Edit.historial()
    });

    $("#borrar").click(()=> {
      var texto = $(".intext").hasClass('seleccionado');
      var figura = $(".elemento").hasClass('seleccionado');
      var imagen = $(".imagenEl").hasClass('seleccionado');
    if( texto || figura || imagen ) {
        $(".intext textarea").attr('disabled', 'disabled');
        $(".intext").removeClass('seleccionado');
        $(".elemento").removeClass('seleccionado');
        $(".imagenEl").removeClass('seleccionado');
        $(".textBox").slideUp( );
        $(".editBox").slideUp( );
        $(".filtroBox").slideUp( );
        $("#cajaTextos").slideDown();
        $("#cajaImagen").slideDown();
        $("#cajaCrear").slideDown();
      }
      this._Edit.historial()
    });
  }

  subirCapa(){
    this._Edit.subirCapa();
  }

  bajarCapa(){
    this._Edit.bajarCapa();
  }

  copy(){
    this._Edit.copy();
  }

  borrar(){
    this._Edit.borrar();
  }

}

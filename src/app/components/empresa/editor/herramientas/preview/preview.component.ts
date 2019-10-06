import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../../../../services/editor.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  constructor(private editor: EditorService) { }

  public image: any;
  public canvas = $('#preCanvas').html();
  ngOnInit() {
  }

  close(){
    $("app-preview").fadeToggle();
    $("canvas").remove();
    $(".herramientas").removeClass('closeHerr');
    $("#fullscreen").removeClass('fulled');
    $("#fullscreen i").removeClass('fulled');
    $("#espacio").removeClass('espacioFull');
    $("app-backbar").toggle()
  }

  descargar(){
    var download = document.getElementById("download");
    this.image = document.querySelector('canvas').toDataURL("image/png")
    var file = this.image.replace("image/png", "image/octet-stream");
    download.setAttribute("href", file);
    this.editor.historial()
  }

}

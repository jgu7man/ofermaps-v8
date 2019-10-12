import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, Pipe, PipeTransform } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';
import { DomSanitizer } from '@angular/platform-browser';

// @Pipe({ name: 'safeHtml'})
// export class SafeHtmlPipe implements PipeTransform  {
//   constructor(private sanitized: DomSanitizer) {}
//   transform(value) {
//     return this.sanitized.bypassSecurityTrustHtml(value);
//   }
// }

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit, OnChanges {

  @Input() data
  public content: any
  constructor( 
    private _Editor: EditorService,
    private sanitized: DomSanitizer
  ) {}

  ngOnInit() {
    this._Editor.elemEditable();
    if (this.data) {
      this.content = this.sanitized.bypassSecurityTrustHtml(this.data)
    } else {
      this.data = `<img src="../../../../../assets/img/transparent.png" id="imagenFondo">`
      this.content = this.sanitized.bypassSecurityTrustHtml(this.data)
    }
  }

  onListo() {
     var target = $(".intext").hasClass('seleccionado');
    if( target ) {
        $(".intext textarea").attr('disabled', 'disabled');
        $(".intext").removeClass('seleccionado');
        $(".textBox").slideToggle( );
        $("#cajaTextos").slideToggle();
      }
      this._Editor.historial()
  }

  changes(event) {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

}

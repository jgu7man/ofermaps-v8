import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.css']
})
export class HerramientasComponent implements OnInit {

  constructor(
    private fs: AngularFirestore,
    private ft: AngularFireStorage
  ) { }

  ngOnInit() {
    $(".menuIconEditor").click(()=> {
      var texto = $(".intext").hasClass('seleccionado');
      var elemento = $(".elemento").hasClass('seleccionado');
    if( texto || elemento ) {
        $(".intext textarea").attr('disabled', 'disabled');
        $(".intext").removeClass('seleccionado');
        $(".elemento").removeClass('seleccionado');
        $(".editBox").slideUp();
        $(".textBox").slideUp();
        $("#cajaTextos").slideDown();
        $("#cajaCrear").slideDown();
      }
    })
  }

  getScreen(){
    $("app-preview").fadeToggle();
    $("app-backbar").toggle()

    html2canvas(
      document.querySelector('#espacio'),
      {
        allowTaint: true,
        useCORS: true,
        scale: 3
      }
    ).then((canvas) => {
      document.querySelector('#preCanvas').appendChild(canvas)
    })

    var oferta = JSON.parse(sessionStorage.getItem('pend'))
    var nombre = oferta.oNombre.replace(/\s/g, "")
    var date = new Date().getTime()
    var node = document.getElementById('espacio');
    var pre = document.getElementById('preCanvas')

    // domtoimage.toPng(node)
    // .then(function (dataUrl) {
    //   var img = new Image()
    //     img.src = dataUrl;
    //     pre.appendChild(img);
    // })
    // .catch(function (error) {
    //     console.error('oops, something went wrong!', error);
    // });

     
    $(".herramientas").addClass('closeHerr');
    $("#fullscreen").addClass('fulled');
    $("#fullscreen i").addClass('fulled');
    $("#espacio").addClass('espacioFull');
  }
  

}

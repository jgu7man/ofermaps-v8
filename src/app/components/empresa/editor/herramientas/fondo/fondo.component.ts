import { Component, OnInit } from '@angular/core';
import { ColorEvent } from 'ngx-color';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { EditorService } from '../../../../../services/editor.service';
declare var src;

@Component({
  selector: 'app-fondo',
  templateUrl: './fondo.component.html',
  styleUrls: ['./fondo.component.css']
})
export class FondoComponent implements OnInit {

  public fondoUrl: string;
  public fondo: any;
  public pos: boolean = false;
  private idEmpresa: string
  private idDesign: string
  constructor(
    private ft: AngularFireStorage,
    private fs: AngularFirestore,
    private editor: EditorService
  ) { }

  ngOnInit() {
    
  }

  cargarFondo(fileInput: any) {
    
    $("app-loading").toggle()
    this.getIDs()
    this.fondo = fileInput.target.files[0];
    const date = new Date().getTime()
    var name = date + this.fondo.name

    this.ft.ref('diseños/' + this.idEmpresa + '/' + name).put(this.fondo).then(res => {
      res.ref.getDownloadURL().then(url => {
        this.fondoUrl = url
        
        this.fs.collection('diseños').ref.doc(this.idDesign).collection('imagenes').add({
          imagen: url
          
        }).then(res => {
          this.renderImage()
        })
      })
    })
    
  }

  getIDs() {
    var emp = JSON.parse(sessionStorage.getItem('pend'))
    this.idEmpresa = emp.idEmpresa

    var design = JSON.parse(sessionStorage.getItem('design'))
    this.idDesign = design.idDesign
    return
  }

  renderImage() {
    var image: any;
        image = document.getElementById('imagenFondo'); 
    image.src = this.fondoUrl
    $("app-loading").toggle()
    this.editor.historial()
  }

  bgColor(color: ColorEvent){
    $("#imagenFondo").attr('src', '').css('background', color.color.hex);
    // $("#espacio")
    this.editor.historial()
  }

  posision(){
    $('app-ajustar-bg').slideToggle();
  }

}

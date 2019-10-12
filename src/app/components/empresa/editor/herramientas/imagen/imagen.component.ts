import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { EditorService } from '../../../../../services/editor.service';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit {

  public imagen;
  public idEmpresa
  public idDesign
  constructor(
    private ft: AngularFireStorage,
    private fs: AngularFirestore,
    private editor: EditorService
  ) { }

  ngOnInit() {
  }

  bloqueImagen(){
    $("#espacio").append('<div class="imagenEl"><img src="" alt=""></div>')
  }

  cargarImagen(fileInput: any) {
    $("app-loading").toggle()
    this.imagen = fileInput.target.files[0];
    const date = new Date().getTime()
    var name = date + this.imagen.name
    
    this.ft.ref('diseños/' + this.idEmpresa + '/' + name).put(this.imagen).then(res => {
      res.ref.getDownloadURL().then(url => {
        this.fs.collection('diseños').ref.doc(this.idDesign).collection('imagenes').add({
          imagen: url
        }).then(res => {
          var image: any;
          image = document.querySelector('.imagenEl img');
          image.src = url
          this.editor.historial()
          $("app-loading").toggle()
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

}

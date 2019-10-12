import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EditorService } from '../../../../../services/editor.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';
import { UploadService } from '../../../../../services/upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  constructor(
    private editor: EditorService,
    private _upload: UploadService,
    private fs: AngularFirestore,
    private ft: AngularFireStorage,
    private router: Router
  ) { }

  public image: any;
  public canvas = $('#preCanvas').html();
  public idDesign
  public porcent
  @Output() setPorcentaje = new EventEmitter()
  ngOnInit() {
    var design = JSON.parse(sessionStorage.getItem('design'))
    if (design) {
      this.idDesign = design.idDesign
    }
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

  async saveImage(file) {
    const path = `diseños/${this.idDesign}`
    const ref = this.ft.ref(path)
    const task = this.ft.upload(path, file)

    await task.percentageChanges().subscribe(res => {
      this.porcent = res
      return this.setPorcentaje.emit(res)
    })

    await task.snapshotChanges().pipe(
        finalize(async () => {
            await ref.getDownloadURL().subscribe(url => {
              this.fs.collection('diseños').doc(this.idDesign).update({
                imagen: url
              })
              var design = JSON.parse(sessionStorage.getItem('design'))
              sessionStorage.setItem('design', JSON.stringify({
                html: design.html,
                idDesign: design.idDesign,
                imagen: url
              }))
            })
        })
        ).subscribe()
    
  }

  descargar(){
    var download = document.getElementById("download");
    // convertir en archivo descargable
    this.image = document.querySelector('canvas').toDataURL("image/png")
    var file = this.image.replace("image/png", "image/octet-stream");
    // guardarlo en el storage
    var canvas = document.querySelector('canvas')
    download.setAttribute("href", file);
    canvas.toBlob(blob => {
      this.saveImage(blob)
    })
    this.editor.historial()
  }

  onUsar() {
    // Tomar documentos
    const oferta = JSON.parse(sessionStorage.getItem('pend'))
    const design = JSON.parse(sessionStorage.getItem('design'))

    // Validar que hay docuemnto de diseño
    if (design) {
      // validar que ya url de la imagen
      if (!design.imagen) {
        // si no la hay, subir la imagen
        var canvas = document.querySelector('canvas')
        canvas.toBlob(blob => {
          this.saveImage(blob)
        })

        if (oferta) {
          // si la hay, redirigir al previo para publicarla con todos los datos actualizados
          sessionStorage.setItem('pend', JSON.stringify({
            idEmpresa: oferta.idEmpresa,
            idOferta: oferta.idOferta,
            keywords: oferta.keywords,
            oCaducidad: oferta.oCaducidad,
            oCanjes: oferta.oCanjes,
            oCantAux: oferta.oCantAux,
            oCantidad: oferta.oCantidad,
            oCodes: oferta.oCodes,
            oCondiciones: oferta.oCondiciones,
            oImagen: design.imagen,
            oLimite: oferta.oLimite,
            oNombre: oferta.oNombre,
            oProdserv: oferta.oProdserv,
            oPublicado: oferta.oPublicado,
            oTipo: oferta.oTipo,
            visible: oferta.visible,
          }))
          this.router.navigate(['/empresa/previo'])
        } else {
          // si no hay oferta pendiente de publicar, redirigir al formulario para crear ofertas
          var user = JSON.parse(localStorage.getItem('omlog'))
          this.router.navigate(['/empresa/crear-oferta/'+ user.m])
        } //fin 
        
      } else {
        // si Sí la hay, revisar si hay documento de oferta pendiente de publicar
        if (oferta) {
          // si la hay, redirigir al previo para publicarla con todos los datos actualizados
          sessionStorage.setItem('pend', JSON.stringify({
            idEmpresa: oferta.idEmpresa,
            idOferta: oferta.idOferta,
            keywords: oferta.keywords,
            oCaducidad: oferta.oCaducidad,
            oCanjes: oferta.oCanjes,
            oCantAux: oferta.oCantAux,
            oCantidad: oferta.oCantidad,
            oCodes: oferta.oCodes,
            oCondiciones: oferta.oCondiciones,
            oImagen: design.imagen,
            oLimite: oferta.oLimite,
            oNombre: oferta.oNombre,
            oProdserv: oferta.oProdserv,
            oPublicado: oferta.oPublicado,
            oTipo: oferta.oTipo,
            visible: oferta.visible,
          }))
          this.router.navigate(['/empresa/previo'])
        } else {
          // si no hay oferta pendiente de publicar, redirigir al formulario para crear ofertas
          var user = JSON.parse(localStorage.getItem('omlog'))
          this.router.navigate(['/empresa/crear-oferta/'+ user.m])
        } //fin 
      } //fin
    }
  }

}

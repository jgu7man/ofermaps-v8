import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';



@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  public idEmpresa: string
  public design: any
  public diseno_free: boolean
  constructor(
    private fs: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(){
    if (window.screen.width <= 700) {
      $("#fullscreen").css('display', 'block')
    }

    var emp = JSON.parse(localStorage.getItem('omlog'))
    if (!emp) {
      this.router.navigate(['/'])
    } else if (emp.e == '') {
      this.router.navigate(['/inicio'])
    }

    this.design = JSON.parse(sessionStorage.getItem('design'))
    if (!this.design) {
      this.getEmpresa()
    } 
    
  }

  getEmpresa() {
    let ofer = JSON.parse(sessionStorage.getItem('pend'))
    if (ofer) {
      this.idEmpresa = ofer.idEmpresa
    this.fs.collection('empresas').ref.doc(this.idEmpresa)
      .collection('plan').get().then(doc => {
        this.diseno_free = doc.docs[0].data().diseno_free
        this.queryDesing()
    })
    } else {
      this.router.navigate(['/empresa/Dashboard'])
    }
  }

  queryDesing() {
    this.fs.collection('diseños').add({
      idEmpresa: this.idEmpresa,
      diseno_free: this.diseno_free
    }).then(ref => {
      sessionStorage.setItem('design', JSON.stringify({idDesign: ref.id}))
    })
  }

  

  fullScreen(){
    $(".herramientas").toggleClass('closeHerr');
    $("#fullscreen").toggleClass('fulled');
    $("#fullscreen i").toggleClass('fulled');
    $("#espacio").toggleClass('espacioFull')
  }

  


}


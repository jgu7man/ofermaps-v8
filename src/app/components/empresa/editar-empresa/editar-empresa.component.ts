import { Component, OnInit } from '@angular/core';
import { EmpresaModel } from '../../../models/Empresa.Model';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent implements OnInit {

  drop: boolean = true;
  open: any;
  public usuario: any;
  public cat: any;
  public catego: any;
  public categorias = [];
  public imagenCargada: any;
  public imagenPaCargar: any;
  public keyword: string
  public empresa: any
  constructor(
    private ruta: ActivatedRoute,
    private fs: AngularFirestore,
    private _empresa: EmpresaService,
    private _router: Router
  ) {
    this.empresa = new EmpresaModel('','','','','','','','','',[])
   }

  ngOnInit() {
    this.ruta.params.subscribe(params => {
      var id = params['id']
      this.fs.collection('empresas').ref.doc(id).get().then(doc => {
        this.empresa = doc.data()
      })
    })

    this.fs.collection('empCategorias').ref.get().then(docs => {
      docs.forEach(doc => {
        this.categorias.push(doc.data().nombre)
      })
    })
  }

  toggle(event) {
    this.catego = event.target.innerText;
    $("#catego").text(this.catego);
    $("#drop-list").scrollTop(0);
    this.cat = event.target.innerText;
    if (this.cat === "Otro") {
      $("#nCategoria").attr("type", "text");
      // this.empresa.nCategoria = $("#nCategoria").val();
    } else {
      $("#nCategoria").attr("type", "hidden");
      this.empresa.nCategoria = this.cat;
    }
  }

  openDrop() {
    $("drop-list").attr("class", "list-drop ofinput list-drop-open");
  }

  addKeyword() {
    this.empresa.keywords.push(this.keyword)
    this.keyword = ''
  }

  delKeyword(i) {
    this.empresa.keywords.splice(i)
  }

  onUpdate() {
    $("app-loading").toggle()
    this._empresa.updateEmpresa(this.empresa, this.imagenCargada);
    this._router.navigate(['/empresa/Dashboard'])
    this.fs.collection('empCategorias').ref.doc('otros').set({
      keywords: [this.empresa.nCategoria]
    }, {merge: true})
  }

  cargarImagen(fileInput: any) {
    this.imagenCargada = fileInput.target.files[0];
    this.imagenPaCargar = <Array<File>>fileInput.target.files;
    var reader = new FileReader();
    reader.onload = function() {
      var image: any;
      image = document.getElementById("avatarPreview");
      image.src = reader.result;
    };

    let url = reader.readAsDataURL(fileInput.target.files[0]);
  }

}

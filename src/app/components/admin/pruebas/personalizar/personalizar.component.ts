import { Component, OnInit } from "@angular/core";
import { EmpresaModel } from "../../../../models/Empresa.Model";
import { Categorias } from "../../../../models/Categoria.Negocio";
import { AngularFireStorage } from "@angular/fire/storage";
import { EmpresaService } from "src/app/services/empresa.service";
import { Route, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MuestrasService } from '../../../../services/muestras.service';
declare var src;
declare var $: any;

@Component({
  selector: "app-personalizar",
  templateUrl: "./personalizar.component.html",
  styleUrls: ["./personalizar.component.css"]
})
export class RegistEmpresaComponent implements OnInit {
  drop: boolean = true;
  open: any;
  public empresa: EmpresaModel;
  public usuario: any;
  public cat: any;
  public catego: any;
  public categorias = [];
  public imagenCargada: any;
  public imagenPaCargar: any;
  public keyword: string;
  public otraCategoria: string

  constructor(
    private storage: AngularFireStorage,
    private _muestra: MuestrasService,
    private _router: Router,
    private fs: AngularFirestore
  ) {
    this.empresa = new EmpresaModel('',"", "", "","", "", "", "", "",[]);
  }

  ngOnInit() {

    (function() {
      $("select").material_select();
    });


    this.fs.collection('empCategorias').ref.get().then(docs => {
      docs.forEach(doc => {
        if (doc.data().nombre != 'otros') {
          this.categorias.push(doc.data().nombre)
        }
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

  async onSubmit() {
    $("app-loading").toggle()
    if (this.otraCategoria) {

      this.empresa.nCategoria = this.otraCategoria //Asignar valor otra categoria a empresa model
      this._muestra.saveEmpresa(this.empresa, this.imagenCargada); //Guardar empresa
      
      // REVISAR SI EXISTE CATEGORIA REPETIDA
      var names = await this.fs.collection('empCategorias').ref
        .where('nombre', '==', this.otraCategoria).get()
      
      var otros = await this.fs.collection('empCategorias').ref
        .where('keywords', 'array-contains', this.otraCategoria).get()
      
      
      if (names.size == 0 || otros.size == 0) {
            // Si no existe guardarla en "otros"
            this.fs.collection('empCategorias').ref.doc('otros').set({
              keywords: [this.otraCategoria]
            }, { merge: true }).then(res => {
              this._router.navigate(['/admin/regist/ubicacion'])
            })
      } else {
        // si existe, no hacer nada
            this._router.navigate(['/admin/regist/ubicacion'])
          }
      
    } else {
      this._muestra.saveEmpresa(this.empresa, this.imagenCargada); //Guardar empresa
    }
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

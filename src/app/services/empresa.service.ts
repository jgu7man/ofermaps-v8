import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { EmpresaModel } from "../models/Empresa.Model";
import { AuthService } from './auth.service';
import * as firebase from "firebase";
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class EmpresaService {
  public idEmpresa: any;
  public eAvatar: any;
  public user: any;
  public empresa: any;
  @Output() setPorcentaje = new EventEmitter()
  constructor(
    private fs: AngularFirestore,
    private storage: AngularFireStorage,
    private auth: AuthService,
    private _router: Router
  ) {
    this.auth.user$.pipe().subscribe(user => {
      this.user = user.uid
    })
  }

  async saveEmpresa(empresa: EmpresaModel, file) {

    await empresa.keywords.forEach(word => {
      var sinAcentos = word
        .normalize('NFD')
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
        .normalize();
      var sinEspacios = sinAcentos.trim()
      var keyword = sinEspacios.toLowerCase()
      return empresa.keywords.push(keyword)
    })
    
    // Guardar datos de la empresa
    var emp = await this.fs.collection("empresas").add({
      idUsuario: empresa.idUsuario,
      nNegocio: empresa.nNegocio.toLowerCase(),
      nCategoria: empresa.nCategoria,
      nTelefono: empresa.nTelefono,
      nCorreo: empresa.nCorreo.toLowerCase(),
      nWebsite: empresa.nWebsite.toLowerCase(),
      keywords: empresa.keywords,
      planActual: 'gratis',
      registro: new Date
    })
    
    // Asignar idEmpresa al documento empresa
    this.idEmpresa = emp.id;
    this.fs.collection('empresas').ref.doc(this.idEmpresa).update({
      idEmpresa: this.idEmpresa
    })

    // Asignar plan por default a empresa
    var plan = await this.fs.collection('planes').ref.doc('gratis').get()
    this.fs.collection('empresas').ref.doc(this.idEmpresa)
      .collection('plan').doc('actual').set(plan.data())
    

    $("app-loading").fadeToggle()
    $("app-uploading").fadeToggle()
    // Guardar la imagen de la empresa y actualizar en la base de datos
    const id = new Date().getTime()
    const name = id + file.name
    const path = `imgEmpresas/muestras/${name}`
    const ref = this.storage.ref(path)
    const task = this.storage.upload(path, file)
    
    await task.percentageChanges().subscribe(res => {
      return this.setPorcentaje.emit(res)
    })

    task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(res => {
              this.eAvatar = res;
              this.fs.collection("empresas").doc(this.idEmpresa).update({
                nAvatar: this.eAvatar
              })
            })
        })
    ).subscribe()
    console.log('imagen de empresa agregada');
        
    // Asignar id de empresa al usuario propietario
    await this.fs.collection('usuarios').doc(this.user).update({
      idEmpresa: this.idEmpresa,
    })

    var user = JSON.parse(localStorage.getItem('omlog'))
    localStorage.setItem('omlog', JSON.stringify({
      m: this.idEmpresa,
      i: user.i,
      z: user.z
    }))
    
    console.log('empresa asignada a usuario')

    this._router.navigate(['/usuario/ubicacion'])
  }


  async updateEmpresa(empresa: EmpresaModel, file: any) {
    await this.fs.collection("empresas").ref.doc(empresa.idEmpresa).set({
      idUsuario: empresa.idUsuario,
      nNegocio: empresa.nNegocio.toLowerCase(),
      nCategoria: empresa.nCategoria,
      nTelefono: empresa.nTelefono,
      nCorreo: empresa.nCorreo.toLowerCase(),
      nWebsite: empresa.nWebsite.toLowerCase(),
      keywords: empresa.keywords,
      planActual: 'gratis',
      actualizacion: new Date
    }, { merge: true })
    
    var id = new Date().getTime();
    const name = id + file.name
        const path = `imgEmpresa/${name}`
        const ref = this.storage.ref(path)
        const task = this.storage.upload(path, file)
        
        await task.percentageChanges().subscribe(res => {
          return this.setPorcentaje.emit(res)
        })
      
      task.snapshotChanges().pipe(
            finalize(() => {
                ref.getDownloadURL().subscribe(res => {
                  this.eAvatar = res;
                  this.fs.collection("empresas").doc(this.idEmpresa).update({
                    nAvatar: this.eAvatar
                  })
                  console.log('imagen de empresa agregada');
              })
            })
        ).subscribe()
  }


  async getEmpresa(idEmpresa: string) {
    await this.fs.collection('empresas').ref
      .doc(idEmpresa).get().then(doc => {
      this.empresa = doc.data()
      })
    return this.empresa
  }

   async getEmpresaByUser(usuario){
     await this.fs.collection('empresas').ref
     .where('idUsuario', '==', usuario).get().then(docs =>{
       docs.forEach(doc => {
        this.empresa = doc.data()
      });
    })
    return this.empresa
  }

  async getEmpresaName(idEmpresa) {
    await this.fs.collection('empresas').doc(idEmpresa).ref.get().then(doc => {
      this.empresa = {
        empId: doc.id,
        empName: doc.data().nNegocio,
        empImg: doc.data().nAvatar
      }
    });
    return this.empresa
  }

  

  async getNumSusc(idEmpresa: string){
    var numSusc;
    await this.fs.collection('empresas').ref.doc(idEmpresa)
    .collection('suscriptores').get().then( docs => {
      numSusc = docs.size;
    });
    return numSusc
  }

  async subirImagenPrueba(file) {
    const id = new Date().getTime()
        const name = id + file.name
        const path = `imgEmpresas/${name}`
        const ref = this.storage.ref(path)
        const task = this.storage.upload(path, file)
        
        await task.percentageChanges().subscribe(res => {
          return this.setPorcentaje.emit(res)
        })

        task.snapshotChanges().pipe(
            finalize(() => {
                ref.getDownloadURL().subscribe(res => {
                    console.log(res);
                })
            })
        ).subscribe()
  }

  
}

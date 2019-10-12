import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { EmpresaModel } from '../models/Empresa.Model';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OfertaModel } from '../models/Oferta.Model';
import { UbicacionEmpresa } from '../models/Ubicacion.Empresa.model';

@Injectable({
    providedIn: "root"
})
export class MuestrasService { 
    constructor(
        private fs: AngularFirestore,
        private storage: AngularFireStorage,
        private _router: Router
    ) { }
    
    public idEmpresa: string
    @Output() setPorcentaje = new EventEmitter

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
        var emp = await this.fs.collection("empresas_muestras")
            .add({
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
        this.fs.collection('empresas_muestras').ref.doc(this.idEmpresa).update({
          idEmpresa: this.idEmpresa
        })
    
        // Asignar plan por default a empresa
        var plan = await this.fs.collection('planes').ref.doc('gratis').get()
        this.fs.collection('empresas_muestras').ref.doc(this.idEmpresa)
          .collection('plan').doc('actual').set(plan.data())
        
    
        $("app-loading").fadeToggle()
        $("app-uploading").fadeToggle()
        // Guardar la imagen de la empresa y actualizar en la base de datos
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
                  empresa.nAvatar = res;
                  this.fs.collection("empresas_muestras").doc(this.idEmpresa).update({
                    nAvatar: empresa.nAvatar
                  })
                })
            })
        ).subscribe()
            
    
        this._router.navigate(['/admin/regist/oferta/'+this.idEmpresa])
    }
    
    
    async postOferta(oferta: OfertaModel, file){
        oferta.oCodes = 0
        oferta.oProdserv = oferta.oProdserv.toLowerCase()


        if (file) {

            const id = new Date().getTime()
            const name = id + file.name
            const path = `imgOfertas/muestras/${name}`
            const ref = this.storage.ref(path)
            const task = this.storage.upload(path, file)
            
            $("app-loading").fadeToggle()
            $("app-uploading").fadeToggle()

            await task.percentageChanges().subscribe(res => {
              return this.setPorcentaje.emit(res)
            })
    
            task.snapshotChanges().pipe(
                finalize(() => {
                    ref.getDownloadURL().subscribe(res => {
                      oferta.oImagen = res;
                      
                        sessionStorage.setItem('pend', JSON.stringify(oferta))
                        this.saveOferta(oferta)
                    })
                })
            ).subscribe()
        } else {
            $("app-loading").toggle()
            sessionStorage.setItem('pend', JSON.stringify(oferta))
            this.saveOferta(oferta)
        }
        
    }

    async saveOferta(oferta: OfertaModel) {

        await oferta.keywords.forEach(word => {
          var sinAcentos = word
            .normalize('NFD')
            .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
            .normalize();
          var sinEspacios = sinAcentos.trim()
          var keyword = sinEspacios.toLowerCase()
          return oferta.keywords.push(keyword)
        })

            this.fs.collection('ofertas_muestras').ref.add({
                idEmpresa: oferta.idEmpresa,
                idOferta: oferta.idOferta,
                keywords: oferta.keywords,
                oCaducidad: oferta.oCaducidad,
                oCanjes: oferta.oCanjes,
                oCantAux: oferta.oCantAux,
                oCantidad: oferta.oCantidad,
                oCodes: oferta.oCodes,
                oCondiciones: oferta.oCondiciones,
                oImagen: oferta.oImagen,
                oNombre: oferta.oNombre,
                oProdserv: oferta.oProdserv,
                oPublicado: oferta.oPublicado,
                oTipo: oferta.oTipo
            }).then(ref => {
            this.fs.collection('ofertas_muestras').ref.doc(ref.id).update({
                idOferta: ref.id
            }).then(res => {
                $("app-loading").toggle()
                sessionStorage.removeItem('pend')
                this._router.navigate(['/admin/regist/empresa'])
                // this.router.navigate(['/empresa/Dashboard'])
            })
        })
    }

    saveUbicacion(ubicacion: UbicacionEmpresa) {
    var user = JSON.parse(localStorage.getItem('omlog'))
    var sinAcentos = ubicacion.dCiudad
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
      .normalize();
    var sinEspacios = sinAcentos.trim()
    var sinMayus = sinEspacios.toLowerCase()

    this.fs.collection('ubicaciones').add({
      idEmpresa: ubicacion.idEmpresa,
      dCalleynum: ubicacion.dCalleynum,
      dColonia: ubicacion.dColonia,
      dCiudad: sinMayus,
      dEstado: ubicacion.dEstado,
      dPais: ubicacion.dPais,
      lat: ubicacion.lat,
      long: ubicacion.long
    }).then(ref =>{})
  }
}
import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { EmpresaService } from './empresa.service';

@Injectable({ providedIn: 'root' })
export class SuscripcionesService{


    constructor(
      private fs: AngularFirestore,
      private _empresas: EmpresaService
    ) { }
    
  async suscribir(idEmpresa, name, email, uid) {
      
    // check muestras
    var emp = await this.fs.collection('empresas').ref.doc(idEmpresa).get()
    if (emp.exists) {
      
      await this.fs.collection('empresas').doc(idEmpresa)
      .collection('suscriptores').doc(uid).set({
          nombre: name,
          email: email,
          date: new Date,
          uid: uid
      })
      
    } else {

      await this.fs.collection('empresas_muestras').doc(idEmpresa)
        .collection('suscriptores').doc(uid).set({
            nombre: name,
            email: email,
            date: new Date,
            uid: uid
        })

    }
    
      await this.fs.collection('usuarios').ref.doc(uid)
        .collection('suscripciones').doc(idEmpresa).set({
          idEmpresa: idEmpresa
        })
    }

    unSuscribe(idEmpresa, uid) {
    
        this.fs.collection('usuarios').ref.doc(uid)
          .collection('suscripciones').doc(idEmpresa).delete()
        
        this.fs.collection('empresas').ref.doc(idEmpresa)
        .collection('suscriptores').doc(uid).delete()
      
        this.fs.collection('empresas_muestras').ref.doc(idEmpresa)
          .collection('suscriptores').doc(uid).delete()
  }
  
  async getSuscripByUser(id) {
    var suscripciones = [],
        actualizaciones = []
    this.fs.collection('usuarios').ref.doc(id)
      .collection('suscripciones').get().then(docs => {
        docs.forEach(doc => {
          this._empresas.getEmpresaName(doc.id).then(emp => {
            suscripciones.push(emp)
          })
          this.getLastOferta(doc.id).then(ofer => {
            if (ofer != undefined) {
              actualizaciones.push(ofer)
            }
          })
        })
      })
    return {suscripciones: suscripciones, actualizaciones: actualizaciones}
  }

  async getLastOferta(idEmpresa) {
    var last,
        today = new Date()
    await this.fs.collection('ofertas').ref
      .where('idEmpresa', '==', idEmpresa)
      .where('oCaducidad', '>', today)
      .get().then(res => {
        if (res.size > 0) {
          last = res.docs[0].data()
        }
      })
    
    await this.fs.collection('ofertas_muestras').ref
      .where('idEmpresa', '==', idEmpresa)
      .where('oCaducidad', '>', today)
      .get().then(res => {
        if (res.size > 0) {
          last = res.docs[0].data()
        }
      })
    
    return last
  }

  async checkSuscripcion(idEmpresa, uid) {
    var suscription = await this.fs.collection('empresas').ref.doc(idEmpresa)
      .collection('suscriptores').where('uid', '==', uid).get()
    if (suscription.empty) {
      var suscription = await this.fs.collection('empresas_muestras').ref.doc(idEmpresa)
      .collection('suscriptores').where('uid', '==', uid).get()
    }
    return suscription.empty
  }
  
}
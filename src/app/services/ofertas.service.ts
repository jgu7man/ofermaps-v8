import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { OfertaModel } from '../models/Oferta.Model';
import { Router } from '@angular/router';
import { FirebaseApp } from '@angular/fire';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OfertasService {

    public Ofertas: any;
    public idOferta: string;
    public urlImg: string;
    public ofertasEmpresa: any;
    public oferta: any;
    public code: string;
    @Output() setPorcentaje = new EventEmitter()
    constructor(
        private fs: AngularFirestore,
        private storage: AngularFireStorage,
        private router: Router
    ){

    }

    async postOferta(oferta: OfertaModel, file){
        oferta.oCodes = 0
        oferta.oProdserv = oferta.oProdserv.toLowerCase()
        if (file) {

            const id = new Date().getTime()
            const name = id + file.name
            const path = `imgOfertas/${name}`
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
                    })
                })
            ).subscribe()
        } else {
            $("app-loading").toggle()
            sessionStorage.setItem('pend', JSON.stringify(oferta))
            
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

        this.fs.collection('ofertas').add({
            idEmpresa: oferta.idEmpresa,
            idOferta: oferta.idOferta,
            keywords: oferta.keywords,
            oCaducidad: oferta.oCaducidad,
            oCanjes: oferta.oCanjes,
            oCantAux: oferta.oCantAux,
            oCantidad: oferta.oCantidad,
            oCodes: oferta.oCodes,
            oLimite:oferta.oLimite,
            oCondiciones: oferta.oCondiciones,
            oImagen: oferta.oImagen,
            oNombre: oferta.oNombre,
            oProdserv: oferta.oProdserv,
            oPublicado: oferta.oPublicado,
            oTipo: oferta.oTipo
            }).then(ref => {
            this.fs.collection('ofertas').ref.doc(ref.id).update({
                idOferta: ref.id
            }).then(res => {
                $("app-loading").toggle()
                sessionStorage.removeItem('pend')
                this.router.navigate(['/empresa/Dashboard'])
            })
        })
    }

    async updateOferta(idOferta: string, oferta: OfertaModel, file: any) {
        var fileId = new Date().getTime();

        await oferta.keywords.forEach(word => {
          var sinAcentos = word
            .normalize('NFD')
            .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
            .normalize();
          var sinEspacios = sinAcentos.trim()
          var keyword = sinEspacios.toLowerCase()
          return oferta.keywords.push(keyword)
        })

        oferta.oProdserv = oferta.oProdserv.toLocaleLowerCase()
        if (file) {
            await this.storage.ref('ofertasImg/' + fileId + file.name).put(file)
                .then(snap => {
                    snap.ref.getDownloadURL().then(url => {
                return oferta.oImagen = url
                })
            })
        }
        this.fs.collection('ofertas').ref.doc(idOferta)
            .update(oferta).then(res => {
                $("app-loading").toggle()
                sessionStorage.removeItem('pend')
                this.router.navigate(['/empresa/Dashboard'])
        })
    }

    async getOneOferta(idOferta){
        var cad;
        var oferta;
        var id;
        await this.fs.collection('ofertas').doc(idOferta)
        .ref.get().then( doc => {
            if (doc.exists) {
                oferta = doc.data()
                cad = oferta.oCaducidad.toDate()
                id = doc.id
            } 
        })
        await this.fs.collection('ofertas_muestras').doc(idOferta)
        .ref.get().then( doc => {
            if (doc.exists) {
                oferta = doc.data()
                cad = oferta.oCaducidad.toDate()
                id = doc.id
            }
        })
        return {oferta, cad, id}
    }

    async getOfertasEmpresa(idEmpresa){
        await this.fs.collection('ofertas').ref
        .where('idEmpresa', '==', idEmpresa)
        .get().then(docs => {
            var ofertasEmpresa = []
            docs.forEach( doc => {
                ofertasEmpresa.push({idOfer: doc.id, data: doc.data()})
            })
            this.ofertasEmpresa = ofertasEmpresa
        }).catch(err => console.log(err));
        
        if (this.ofertasEmpresa.length == 0) {
            await this.fs.collection('ofertas_muestras').ref
        .where('idEmpresa', '==', idEmpresa)
        .get().then(docs => {
            var ofertasEmpresa = []
            docs.forEach( doc => {
                ofertasEmpresa.push({idOfer: doc.id, data: doc.data()})
            })
            this.ofertasEmpresa = ofertasEmpresa
        }).catch( err => console.log(err));
        }

        return this.ofertasEmpresa
    }

    async getAllOfertas(){
        await this.fs.collection('ofertas')
            .get().forEach(docs => {
                var ofertas = []
                docs.forEach( doc => {
                    ofertas.push({idOfer: doc.id, data:doc.data()});
                });
                this.Ofertas = ofertas;
            });
            return this.Ofertas
    }

    public ofertaCheck: boolean;
    async checkOferta(idOferta, idUser){
        await this.fs.collection('codes').ref
        .where('usuario', '==', idUser)
        .where('oferta', '==', idOferta)
        .get().then( docs => {
            if(docs.size == 0){
                this.ofertaCheck = false
            } else {
                this.ofertaCheck = true
                docs.forEach( doc => {
                    this.code = doc.id
                })
            }
        });
        return {check: this.ofertaCheck, code: this.code}
    }

    async takeVista(idEmpresa, idOferta) {
        const oferta = this.fs.collection('ofertas').ref.doc(idOferta);
        const plan = this.fs.collection('empresas').ref.doc(idEmpresa)
            .collection('plan').doc('actual');
        
        plan.get().then(doc => {
            if (doc.exists) {
                plan.update({ vistas: doc.data().vistas - 1 })
            }
        })

        oferta.get().then(doc => {
            if (doc.exists) {
                if (!doc.data().vistas) {
                    oferta.update({ vistas: 1 })
                } else {
                    oferta.update({ vistas: doc.data().vistas + 1 })
                }
            }
        })
    }

    async getCode(idOferta, idUser) {
        const oferta = this.fs.collection('ofertas').ref.doc(idOferta);

        await oferta.get().then(doc => {
            if (doc.exists) {
                oferta.update({ oCodes: doc.data().oCodes + 1 })
            }
        })

        await this.fs.collection('codes').add({
            usuario: idUser,
            oferta: idOferta
        }).then( ref => {
            this.code = ref.id
        }).catch( err => console.log(<any>err));
        return this.code
    }

    async getOfertasUsuario(idUser){
        await this.fs.collection('codes').ref
        .where('usuario','==', idUser)
        .get().then(docs => {
            var ofertas = []
            docs.forEach(doc => {
                let oferta = doc.data()
                var idOferta = oferta.oferta
                if (oferta.canjeado) {
                    this.getOneOferta(idOferta).then(res => {
                        res['canjeado'] = 'true'
                        ofertas.push(res)
                    })
                } else {
                    this.getOneOferta(idOferta).then(res => {
                        ofertas.push(res)
                    })
                }
            });
            this.Ofertas = ofertas;
        });
        return this.Ofertas
    }

    async canjeCode(code, idEmpresa) {
        var codeQuery = await this.fs.collection('codes').ref.doc(code).get()
            
        if (!codeQuery.data().canjedo) {
            
            var usuario = codeQuery.data().usuario
            var idOferta = codeQuery.data().oferta
            
            var oferta = await this.fs.collection('ofertas').ref.doc(idOferta).get()
            var empresa = oferta.data().idEmpresa
            if (empresa == idEmpresa) { 
    
                await this.fs.collection('codes').ref.doc(code).update({
                    canjeado: true,
                    fechaCanje: new Date()
                })
                
                await this.fs.collection('ofertas').ref.doc(idOferta).update({
                    oCanjes: oferta.data().oCanjes + 1
                })
                
                var uQuery = await this.fs.collection('usuarios').ref.doc(usuario).get()
                var userData = uQuery.data()
                return { status: 'exito', usuario: userData, oferta: oferta.data() }
                
            } else {
                return {status: 'equivocada'}
            }
        } else {
            return {status: 'canjeado'}
        }
    }

}
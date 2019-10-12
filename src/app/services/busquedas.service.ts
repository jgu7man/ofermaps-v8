import { Injectable, Output, EventEmitter } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class BusquedaService {

    
    @Output() resProd: EventEmitter<any> = new EventEmitter()
    @Output() resEmp: EventEmitter<any> = new EventEmitter()
    @Output() resCat: EventEmitter<any> = new EventEmitter()
    @Output() resCity: EventEmitter<any> = new  EventEmitter()
    @Output() buscar: EventEmitter<boolean> = new EventEmitter()
    busqueda = true
    constructor(
        private fs: AngularFirestore
    ) { }

    onSearch() {
        this.buscar.emit(this.busqueda)
    }

    async serachByProd(word: string) {
        var sinAcentos = word
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
            .normalize();
        var sinEspacios = sinAcentos.trim()
        var keyword = sinEspacios.toLowerCase()

        var prod = []
        var ofertas;
        ofertas = await this.fs.collection('ofertas').ref
            .where('keywords', 'array-contains', keyword).get()
        
        ofertas.forEach(doc => {
                prod.push(doc.data())
                this.resProd.emit({
                    word: word,
                    results: prod
                })
            })
            
        if (ofertas.size == 0) {
            ofertas = await this.fs.collection('ofertas_muestras').ref
                .where('keywords', 'array-contains', keyword).get()
            
            ofertas.forEach(doc => {
                prod.push(doc.data())
                this.resProd.emit({
                    word: word,
                    results: prod
                })
            })
        }
    }

    async searchByEmpresa(word: string) {
        
        var sinAcentos = word
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
            .normalize();
        var sinEspacios = sinAcentos.trim()
        var keyword = sinEspacios.toLowerCase()

        var emp = []
        await this.fs.collection('empresas').ref.where('nNegocio', '==', keyword)
            .get().then(async docs => {
                docs.forEach(doc => {
                    emp.push(doc.data())
                    this.resEmp.emit({
                        word: word,
                        results:emp
                    })
                })
                
                // MUESTRAS
                if (docs.size == 0) {
                    await this.fs.collection('empresas_muestras').ref.where('nNegocio', '==', keyword)
                        .get().then(docs => {
                            docs.forEach(doc => {
                                emp.push(doc.data())
                                this.resEmp.emit({
                                    word: word,
                                    results: emp
                                })
                            })
                        })
                }
        })
        return emp
    }

    async searchByCategoriaEmpresa(word: string) {
        
        var sinAcentos = word
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
            .normalize();
        var sinEspacios = sinAcentos.trim()
        var keyword = sinEspacios.toLowerCase()

        var emp = []
        await this.fs.collection('empresas').ref.where('nCategoria', '==', keyword)
            .get().then(async docs => {
                docs.forEach(doc => {
                    emp.push(doc.data())
                    this.resCat.emit({
                        word: word,
                        results:emp
                    })
                })
                
                // muestras
                if (docs.size == 0) {
                    await this.fs.collection('empresas_muestras').ref.where('nCategoria', '==', keyword)
                        .get().then(docs => {
                            docs.forEach(doc => {
                                emp.push(doc.data())
                                this.resCat.emit({
                                    word: word,
                                    results: emp
                                })
                            })
                        })
                }
        })
        return emp
    }

    async searchByCiudad(word: string) {
        
        var sinAcentos = word
            .normalize('NFD')
            .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
            .normalize();
        var sinEspacios = sinAcentos.trim()
        var keyword = sinEspacios.toLowerCase()

        var ofers = []
        var ubicaciones = await this.fs.collection('ubicaciones').ref
            .where('dCiudad', '==', keyword).get()
        
        ubicaciones.forEach(async doc => {
            var emp = doc.data().idEmpresa
            
            await this.fs.collection('ofertas').ref
                .where('idEmpresa', '==', emp)
                .get().then(ofertas => {
                    ofertas.forEach(ofer => {
                        ofers.push(ofer.data())
                    })
                    this.resCity.emit({
                        word: word,
                        results:ofers
                    })
                })
                
                // muestras
            this.fs.collection('ofertas_muestras').ref
                .where('idEmpresa', '==', emp)
                .get().then(ofertas => {
                    ofertas.forEach(ofert => {
                        ofers.push(ofert.data())
                    })
                    this.resCity.emit({
                        word: word,
                        results: ofers
                    })
                })
        })
        
    }
}
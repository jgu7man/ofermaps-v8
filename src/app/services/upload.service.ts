import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { EmpresaService } from './empresa.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class UploadService{
    constructor(
        private ft: AngularFireStorage,
        private fs: AngularFirestore
    ) { }
    
    @Output() setPorcentaje = new EventEmitter()
    public url: Observable<any>

    async uploadFile(file: any, name: string, folder: string, firestoreDoc: string, firesotreCol: string) {

        $("app-uploading").fadeToggle()
    
        const path = `${folder}/${name}`
        const ref = this.ft.ref(path)
        const task = this.ft.upload(path, file)
    
        await task.percentageChanges().subscribe(res => {
          return this.setPorcentaje.emit(res)
        })
    
        await task.snapshotChanges().pipe(
            finalize(async () => {
                await ref.getDownloadURL().subscribe(res => {
                  this.url = res
                  return this.fs.collection(firesotreCol).doc(firestoreDoc).update({
                    imagen: res
                  })
                })
                return
            })
            ).subscribe()
            return this.url
            
        }
}
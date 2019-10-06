import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { EmpresaService } from './empresa.service';

@Injectable({ providedIn: 'root' })
export class UploadService{
    constructor(
        private _empresa: EmpresaService
    ) { }
    
    @Output() setPorcentaje = new EventEmitter()
    

    getPorcentaje() {
        this._empresa.setPorcentaje.subscribe(res => {
            this.setPorcentaje.emit(res)
        })
    }
}
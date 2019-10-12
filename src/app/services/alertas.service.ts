import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({providedIn: 'root'}) 
export class AlertaService {
    constructor() { }
    @Output() setAlerta = new EventEmitter()

    sendAlerta(alerta) {
        this.setAlerta.emit(alerta)
    }
}

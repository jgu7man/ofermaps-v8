import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit, OnChanges {

  @Input() ofertas: any;
  @Input() ciudad: string;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
  }

}

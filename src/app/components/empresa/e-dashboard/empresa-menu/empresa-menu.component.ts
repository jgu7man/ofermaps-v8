import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empresa-menu',
  templateUrl: './empresa-menu.component.html',
  styleUrls: ['./empresa-menu.component.css']
})
export class EmpresaMenuComponent implements OnInit {

  @Input() idEmpresa: string
  constructor() { }

  ngOnInit() {
  }

}

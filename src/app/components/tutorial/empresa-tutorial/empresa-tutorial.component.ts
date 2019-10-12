import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa-tutorial',
  templateUrl: './empresa-tutorial.component.html',
  styleUrls: ['./empresa-tutorial.component.css']
})
export class EmpresaTutorialComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onTuto() {
    localStorage.setItem('oftuto', JSON.stringify({
      tutorial: true
    }))
  }

  offTuto() {
    localStorage.setItem('oftuto', JSON.stringify({
      tutorial: false
    }))
  }

}

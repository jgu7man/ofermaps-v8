import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-ses-alert',
  templateUrl: './c-ses-alert.component.html',
  styleUrls: ['./c-ses-alert.component.css']
})
export class CSesAlertComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cerrar(){
    $("app-c-ses-alert").css('display', 'none')
  }

}

import { Component, OnInit, OnChanges } from '@angular/core';
import { BusquedaService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public byProd: any
  public byEmp: any
  public byCat: any
  public byCity: any
  public matchWord
  constructor(
    private _busquedas: BusquedaService
  ) { }

  ngOnInit() {
    
    this._busquedas.resProd.subscribe(res => {
      this.byProd = res.results
      this.matchWord = res.word
    })
    this._busquedas.resEmp.subscribe(res => {
      this.byEmp = res.results
      this.matchWord = res.word
    })
    this._busquedas.resCat.subscribe(res => {
      this.byCat = res.results
      this.matchWord = res.word
    })
    this._busquedas.resCity.subscribe(res => {
      this.byCity = res.results
      this.matchWord = res.word
    })
  }

}

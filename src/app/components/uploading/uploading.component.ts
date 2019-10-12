import { Component, OnInit, Input } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { UploadService } from 'src/app/services/upload.service';
import { OfertasService } from '../../services/ofertas.service';
import { MuestrasService } from 'src/app/services/muestras.service';


@Component({
  selector: 'app-uploading',
  templateUrl: './uploading.component.html',
  styleUrls: ['./uploading.component.css']
})
export class UploadingComponent implements OnInit {

  @Input() loadValue = 0
  @Input() textValue = 0
  public fileToUpload
  constructor(
    public _empresa: EmpresaService,
    public _oferta: OfertasService,
    public _muestras: MuestrasService,
    public _upload: UploadService
  ) { }

  ngOnInit() {
    this.listenPorcentaje()
  }


  listenPorcentaje() {
    this._upload.setPorcentaje.subscribe(porcent => {
      this.textValue = Math.round(porcent)
      this.loadValue = porcent
    })
    this._empresa.setPorcentaje.subscribe(porcent => {
      this.textValue = Math.round(porcent)
      this.loadValue = porcent
    })
    this._oferta.setPorcentaje.subscribe(porcent => {
      this.textValue = Math.round(porcent)
      this.loadValue = porcent
    })
    this._muestras.setPorcentaje.subscribe(porcent => {
      this.textValue = Math.round(porcent)
      this.loadValue = porcent
    })
  }

  setImage(file) {
    this.fileToUpload = file.target.files[0]
  }

  submit() {
    this._empresa.subirImagenPrueba(this.fileToUpload)
  }

}

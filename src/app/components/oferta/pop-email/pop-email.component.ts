import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OfertasService } from '../../../services/ofertas.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-pop-email',
  templateUrl: './pop-email.component.html',
  styleUrls: ['./pop-email.component.css']
})
export class PopEmailComponent implements OnInit {

  @Input() idOferta
  @Input() user
  @Output() sendCode = new EventEmitter()
  public email
  constructor(
    private _oferta: OfertasService,
    private fs: AngularFirestore
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this._oferta.getCode(this.idOferta, this.user.uid)
      .then(res => {
        this.sendCode.emit(res)
      });
    this.fs.collection('usuarios').ref.doc(this.user.uid).update({
      email: this.email
    })
  }

}

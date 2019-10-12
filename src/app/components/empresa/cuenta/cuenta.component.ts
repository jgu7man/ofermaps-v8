import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PlanModel } from '../../../models/Planes.model';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  public plan: PlanModel
  public vence: any
  constructor(
    private fs: AngularFirestore
  ) {
    this.plan = new PlanModel(0,'','','',[],0,0,0,'')
   }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('omlog'))
    this.fs.collection('empresas').ref.doc(user.m)
      .collection('plan').doc('actual').get().then(doc => {
        this.plan = doc.data() as PlanModel
        this.vence = doc.data().vence.toDate().toLocaleDateString()
    })
  }

}

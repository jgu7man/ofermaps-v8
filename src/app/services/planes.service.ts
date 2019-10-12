import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

import { PlanModel } from "../models/Planes.model";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable()
export class PlanesServicio {

  public planes =[]
  public plan
  constructor(
    private fs: AngularFirestore,
    private router: Router
    ) {
      
    }

  async getPlanes(pais: string) {
    await this.fs.collection('planes').ref.orderBy('id').get().then(docs => {
      var planes = []
      docs.forEach(doc => {
        var plan = doc.data() as Plan
        var precio
        switch (pais) {
          case 'México': precio = doc.data().precio.mx;
            break;
          case 'Uruguay': precio = doc.data().precio.uy;
            break;
        }
        plan.precio = precio
        planes.push(plan)
      })
      this.planes = planes
    })
    return this.planes
    }

    // planesList(): Observable<PlanModel[]> {
    //   return of(PLANES);
    // }

    async getPlan(id: number) {
      await this.fs.collection('planes').ref
        .where('id', '==', id).get().then(docs => {
        this.plan = docs.docs[0].data()
        })
      return this.plan
    }

  setNewPlan(id: number) {
    var log = JSON.parse(localStorage.getItem('omlog'))
    this.fs.collection('planes').ref.where('id', '==', id).get().then( async doc => {
      var plan = doc.docs[0].data()
      var planName = doc.docs[0].id
      await this.fs.collection('empresas').ref.doc(log.m).update( {
        planActual: planName
      })

      var vence = await this.getVence()
      plan['vence'] = vence

      this.fs.collection('empresas').ref.doc(log.m)
        .collection('plan').doc('actual').set(plan)
    }).then(res => {
      this.router.navigate(['/empresa/Dashboard'])
    })
  }

  getVence() {
    var esteDia = new Date().getDay()
    var esteMes = new Date().getMonth()
    var esteYear = new Date().getFullYear()
    if (esteDia == 31) {
      var sigDia = 1;
      var sigMes = esteMes + 2
      var sigYear = esteYear
    } else if (esteMes == 1 && esteDia == 28) {
      var sigDia = 30
      var sigMes = esteMes + 2
      var sigYear = esteYear
    } else if (esteMes == 11) {
      var sigDia = esteDia
      var sigMes = 0
      var sigYear = esteYear + 1
    } else {
      var sigDia = esteDia
      var sigMes = esteMes + 2
      var sigYear = esteYear
    }
      
    var vence;
      return vence = new Date(sigYear, sigMes, sigDia)
  }

  async getPlanActual(idEmpresa) {
    var planActual = await this.fs.collection('empresas').ref.doc(idEmpresa)
      .collection('plan').doc('actual').get()
    if (planActual.data().nombre != 'gratis') {
      var fechaVencimiento = planActual.data().vence.toDate()
      return fechaVencimiento
    } else {
      return planActual.id
    }
  }

  async setPlanGratis(id) {
    var planGratis = await this.fs.collection('planes').ref.doc('gratis').get()
    var plan = planGratis.data()
    this.fs.collection('empresas').ref.doc(id)
    .collection('plan').doc('actual').set(plan)
  }


}

export interface Plan {
  id: number,
  nombre: string,
  precio: string,
  periodo: string,
  beneficios: []
}
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-ubicacion',
  templateUrl: './ver-ubicacion.component.html',
  styleUrls: ['./ver-ubicacion.component.css']
})
export class VerUbicacionComponent implements OnInit {

  public ubicaciones = []
  public lat
  public long
  constructor(
    private fs: AngularFirestore,
    private ruta: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ruta.params.subscribe(params => {
      var id = params['idEmpresa']
      this.fs.collection('ubicaciones').ref.where('idEmpresa', '==', id).get().then(docs => {
        
        this.lat = docs.docs[0].data().lat
        this.long = docs.docs[0].data().long

        docs.forEach(doc => {
          this.ubicaciones.push(doc.data())
        })

      })
    })

  }


  iconMap = {
    iconCurrent: "../../../../assets/img/CurrentPosition20.png",
    iconUrl: "../../../../assets/img/iso20.png"
  };

}

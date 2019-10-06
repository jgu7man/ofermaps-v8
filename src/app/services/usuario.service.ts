import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Query } from '@firebase/firestore-types'
import { UsuarioModel } from '../models/Usuario.Model';
import { Router } from '@angular/router';



@Injectable({
    providedIn: 'root'
  })
  export class UsuarioService {

    public Usuario: UsuarioModel;
    constructor(
        private readonly firestore: AngularFirestore,
        private _Router: Router
    ){
        this.Usuario = new UsuarioModel('','','','');
    }

    async saveUser(usuario: any){
        this.Usuario = new UsuarioModel(usuario.name, usuario.email, usuario.photoUrl, '');
        
        await this.firestore.collection('usuarios').ref.where('email', '==', usuario.email)
        .get().then(snap =>{
            var num = snap.size;
            if (num == 0) {
                this.firestore.collection('usuarios').add({
                    nombre: this.Usuario.displayName,
                    email: this.Usuario.email,
                    fotoPerfil: this.Usuario.photoURL
                }).then(ref => {
                this.Usuario.uid = ref.id.toString()
                this.firestore.collection('usuarios')
                .doc(this.Usuario.uid).update({uid: this.Usuario.uid})
                localStorage.setItem('loged', JSON.stringify(this.Usuario))   
                })
            } else {
                snap.forEach(doc => {
                    this.Usuario.uid = doc.id;
                    localStorage.setItem('loged', JSON.stringify(doc.data())); 
                })            
            }
        });
        
        setTimeout(()=> {
            
            var loged = JSON.parse(localStorage.getItem('loged'))
            this._Router.navigate(['inicio'])
        }, 2000)
        
    }


    
  }

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private db:AngularFirestore) { }

  getTest(){
    return this.db.collection('test').snapshotChanges().pipe(map(data =>{
        return data.map(d=>{
          const data = d.payload.doc.data();
          data['id'] = d.payload.doc.id
          return data;
        })
      })
    );
  }



}

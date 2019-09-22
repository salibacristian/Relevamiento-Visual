import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';

export interface Foto {
  id: string;
  usuario: string;
  link: string;
  tipo: string;
  votos: number;
  fecha: string;
}

export interface Votos {
  docId: string;
  fotoId: string;
  users: string;
}

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  constructor(
    private MiAuth: AngularFireAuth,
    private fireStorage: AngularFireStorage,
    private firestore: AngularFirestore) { }


  /** Conecta con Cloud Firestore para subir el archivo de la foto */
  public UploadToFirebase(pictureAux: any, type: string) {
    const picName = `${this.MiAuth.auth.currentUser.email.split('@')[0]}_${(new Date()).getTime()}`;
    const selfieRef: any = this.fireStorage.storage.ref(picName);
    let dat = this.fireStorage.storage.ref(picName).putString(pictureAux, 'base64', { contentType: 'image/jpeg' }).then(
     async () =>{
      await this.fireStorage.ref(picName).getDownloadURL().subscribe(downloadLink => {
        this.UploadToFirestore(downloadLink.toString(), type);
        // this.errorHand.MostrarErrorSolo(data);
      });
     }  
    )
    return dat;
    // selfieRef
    //   .putString(pictureAux, 'base64', { contentType: 'image/jpeg' })
    //   .then(async () => {
    //     await this.fireStorage.ref(picName).getDownloadURL().subscribe(downloadLink => {
    //       this.UploadToFirestore(downloadLink.toString(), type);
    //       // this.errorHand.MostrarErrorSolo(data);
    //     });
    //     // this.errorHand.MostrarErrorSolo('Link obtenido (aka Imagen subida)');
    //   });
  }

  /** Conecta con firebase para subir los datos de la foto a la tabla de 'relVisual', así como el nuevo doc de votos a la tabla 'votos' */
  public async UploadToFirestore(downloadLink: string, type: string) {
    // Add a new document with a generated id.
    const addDoc: any = this.firestore.collection('relVisual').add({
      usuario: this.MiAuth.auth.currentUser.email,
      link: downloadLink,
      tipo: type,
      votos: 0,
      fecha: (new Date()).toLocaleString()
    }).then(ref => {
      this.firestore.collection('votos').add({
        fotoId: ref.id,
        users: '[]'
      }).then(() => {
          "Error handler hacer"

      }).catch((err) => {
        console.log('Error al añadir en Votos', err);
        ref.delete();
      });
    }).catch(err => {
      console.log('Error al añadir en fotos', err);
    });
  }

  /** Conecta con firebase para obtener todas las fotos de la base sin filtrarlas */
  public ObtenerFotos() {
    return this.firestore.collection('relVisual').snapshotChanges().pipe(map((fotos) => {
      return fotos.map((a) => {
        const data = a.payload.doc.data() as Foto;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  /** Esta no es de firebase, es un filtrado de fotos */
  public FiltrarFotos(fotos: Array<Foto>, tipo: string): Array<Foto> {
    const auxReturn = new Array<Foto>();

    for (const foto of fotos) {
      if (foto.tipo === tipo) {
        auxReturn.push(foto);
      }
    }

    return auxReturn;
  }

  /** Esta no es de firebase, es una simple verificación */
  private ValidarUser(user: string, arrayUsers: any) {
    let auxReturn = true;

    for (const userA of arrayUsers) {
      if (user === userA) {
        auxReturn = false;
      }
    }

    return auxReturn;
  }

  /** Conecta con Firebase para editar los votos de la foto y los usuarios que votaron */
  public async EditarFoto(foto: Foto) {

    // console.log(foto.id);
    let votos: Votos = null;
    const user = this.MiAuth.auth.currentUser.email;

    await this.firestore.collection('votos').ref.where('fotoId', '==', foto.id).get().then(async (documento) => {
      votos = documento.docs[0].data() as Votos;
      votos.docId = documento.docs[0].id;

      // console.log('Encontré el voto', votos.users);

      const auxUsers: Array<string> = JSON.parse(votos.users);
      if (this.ValidarUser(user, auxUsers)) {
        foto.votos++;
        auxUsers.push(user);
        votos.users = JSON.stringify(auxUsers);

        // console.log('Voy a setear los votos');
        this.firestore.collection('votos').doc(votos.docId).set({
          fotoId: votos.fotoId,
          users: votos.users
        }).then(async () => {
          console.log('Voy a setear la foto');
          return await this.firestore.collection('relVisual').doc(foto.id).set({
            usuario: foto.usuario,
            link: foto.link,
            tipo: foto.tipo,
            votos: foto.votos,
            fecha: foto.fecha,
          }).catch(err => {
            console.log('Error en set de la foto', err);
          }).then(() => {


          });
        }).catch(err => {
          console.log('Error en set de los votos', err);
        }).catch(err => {
          console.log('Error en get de los votos', err);
        });
      }





    });
  }
}

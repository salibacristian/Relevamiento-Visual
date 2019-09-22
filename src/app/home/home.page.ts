import { Component } from '@angular/core';
import { TestService } from '../service/test.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../services/foto.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private publicRouter:Router, private camera: Camera, private subir:FotosService) { }
  aux;
  ngOnInit() {

    
  }
  tomarFoto(tipo){
    const camOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true,
      correctOrientation: true,
    };

    this.camera.getPicture(camOptions).then(async (pictureAux) => {
      // Send the picture to Firebase Storage
      this.subir.UploadToFirebase(pictureAux, tipo);
    }, error => {
      console.log(error);
      if (error === 'No Image Selected') {
        console.log(error);
      } else {
        console.log(error);
      }
      console.log(error);
    }).catch(err => {
      console.log(err);
    });

  }
  mover(lugar){
    this.aux = this.tomarFoto(lugar);
    this.publicRouter.navigate([lugar]);
  }
}


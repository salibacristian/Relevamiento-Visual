import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { TestService } from '../service/test.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  email: string;
  password: string;
  constructor(private authService: AuthService, private test: TestService, private publicRouter: Router, public alertController: AlertController) { }

  ngOnInit() {
    // this.test.getTest().subscribe( chats => {
    //   chats
    // })

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Por favor, reingrese.',
      buttons: ['OK']
    });

    await alert.present();
  }

  OnSubmitLogIn() {
    this.authService.logIn(this.email, this.password).then(res => {
      console.log(res['user']['uid']);
      this.publicRouter.navigate(['/home']);
    }).catch(err => { console.log(err); this.presentAlert() });
  }
  
  Rellenar(usr, password) {
    this.email = usr;
    this.password = password;
  }
}

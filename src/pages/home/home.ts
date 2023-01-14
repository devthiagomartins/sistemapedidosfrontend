import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, ToastController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email : "",
    senha : ""
  }
  constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService, public toastCtrl : ToastController) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
  
  ionViewDidEnter() {
    this.auth.refreshToken().subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    }, error => {});  
  }

  login(){
    this.auth.authenticate(this.creds).subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
      this.presentToast();
    }, error => {});   
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Logado com sucesso!',
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }

}

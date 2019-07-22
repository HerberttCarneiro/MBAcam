import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public photos = [];

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController) {

  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Adicionar imagem',
      buttons: [
        {
          text: 'Tirar foto',
          handler: () => {
            this.takePhoto(this.camera.PictureSourceType.CAMERA)
          }
        },{
          text: 'Abrir galeria',
          handler: () => {
            this.takePhoto(this.camera.PictureSourceType.PHOTOLIBRARY)
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePhoto(type) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: type
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      
      this.photos.push(base64Image);
    }, (err) => {
      alert('Não foi possível adicionar a foto')
    });
  }
}

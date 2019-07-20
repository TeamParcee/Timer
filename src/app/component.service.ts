import { Injectable } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
  ) { }



  showModal(component, componentProps) {
    this.modalCtrl.create({
      component: component,
      componentProps: componentProps
    }).then((modal) => {
      modal.present();
    })
  }

  closeModal() {
    this.modalCtrl.dismiss()
  }

  showOkAlert(header: string, message: string) {
    this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ["OK"]
    }).then((alert) => {
      alert.present();
    })
  }

  confirmationAlert(header: string, message: string, buttons: { denyText: string, confirmText: string }) {

    return new Promise((resolve) => {
      this.alertCtrl.create({
        header: header,
        message: message,
        buttons: [
          {
            text: buttons.denyText,
            handler: () => {
              return resolve(false)
            }
          }, {
            text: buttons.confirmText,
            handler: () => {
              return resolve(true)
            }
          }
        ]
      }).then((alert) => {
        alert.present();
      })
    })

  }
}

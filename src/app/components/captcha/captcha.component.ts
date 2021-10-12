import { Component, OnInit } from '@angular/core';
import { configuracionCaptcha } from 'src/app/models/conf-captcha.model';
/* Importamos el archivo js de la carpeta  utilities/captcha/captcha-mini.js*/
var Captcha = require('../../utilities/captcha/captcha-mini.js');

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {

  /* Podemos configurar el captcha de acuerdo a la clase "configuracionCaptcha" donde vienen las propiedades que se pueden configurar */
  /* Ejemplo, cuantos caracteres queremos que muestre el capcha, la cadena de caracteres que se quiere convinar eje. "ABCDE1234567890..."*/
  public configuracionCaptcha: configuracionCaptcha = {
    length: 6, 
    content: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  }

  /* Podemos mandar la configuracion del captcha, esta funcion recide un arreglo de tipo "configuracionCaptcha" */
  public captcha = new Captcha(this.configuracionCaptcha);
  constructor() { }

  ngOnInit(): void {
    /* Dibujamos el captcha al canvas con id="captcha1" */
    this.captcha.draw(document.querySelector('#captchaEjemplo'), (r: any) => {
      console.log(`Captcha genarado: ${r}`);
    });
  }

  /* Recargamos el captcha */
  public cargarCaptcha() {
    this.captcha.refresh();
  }
}

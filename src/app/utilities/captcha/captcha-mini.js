function Captcha(params = {}) {
  let middleParams = Object.assign(
    {
      lineWidth: 1, // Ancho de línea
      lineNum: 6, // Número de líneas
      dotR: 10, // Radio de los punto
      dotNum: 8, // Número de puntos
      preGroundColor: [10, 80], // Intervalo de color de primer plano
      backGroundColor: [150, 250], // Intervalo de color de fondo
      fontSize: 32, // tamaño de fuente
      fontFamily: [
        "Arial",
        "Arial Rounded MT Bold",
        "Calibri",
        "Gill Sans",
        "Century Gothic",
        "Candara",
        "Ink Free",
        "Goudy Old Style",
      ], // Tipo de fuente
      fontStyle: "fill", // Método de dibujo de fuente, hay relleno y trazo
      content: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", // Contenido del código de verificación
      length: 6, // Longitud del código de verificación
    },
    params
  );
  Object.keys(middleParams).forEach((item) => {
    this[item] = middleParams[item];
  });
  this.canvas = null;
  this.paint = null;
}

/* Método de encuadernación en el prototipo de Captcha
 * Obtenga el número aleatorio del intervalo
 * params [] */
Captcha.prototype.getRandom = function (...arr) {
  arr.sort((a, b) => a - b);
  return Math.floor(Math.random() * (arr[1] - arr[0]) + arr[0]);
};

/* Método de encuadernación en el prototipo de Captcha
 * Obtén colores aleatorios
 * params [] */
Captcha.prototype.getColor = function (arr) {
  let colors = new Array(3).fill("");
  colors = colors.map((item) => this.getRandom(...arr));
  return colors;
};

/* Método de encuadernación en el prototipo de Captcha
 * obtener el código de verificación */
Captcha.prototype.getText = function () {
  let length = this.content.length;
  let str = "";
  for (let i = 0; i < this.length; i++) {
    str += this.content[this.getRandom(0, length)];
  }
  return str;
};

/* Método de encuadernación en el prototipo de Captcha
 * Dibujar líneas */
Captcha.prototype.line = function () {
  for (let i = 0; i < this.lineNum; i++) {
    /* Obtener la posición inicial de la línea al azar */
    let x = this.getRandom(0, this.canvas.width);
    let y = this.getRandom(0, this.canvas.height);
    let endX = this.getRandom(0, this.canvas.width);
    let endY = this.getRandom(0, this.canvas.height);

    this.paint.beginPath();
    this.paint.lineWidth = this.lineWidth;

    /*Obtén el camino del color*/
    let colors = this.getColor(this.preGroundColor);
    this.paint.strokeStyle = "rgba(" + colors[0] + "," + colors[1] + "," + colors[2] + "," + "0.8)";

    /*Dibujar camino*/
    this.paint.moveTo(x, y);
    this.paint.lineTo(endX, endY);
    this.paint.closePath();
    this.paint.stroke();
  }
};

/* Método de encuadernación en el prototipo de Captcha
 * Dibujar puntos */
Captcha.prototype.circle = function () {
  for (let i = 0; i < this.dotNum; i++) {
    /*Obtener el centro del círculo al azar*/
    let x = this.getRandom(0, this.canvas.width);
    let y = this.getRandom(0, this.canvas.height);
    this.paint.beginPath();
    /*Dibuja un circulo*/
    this.paint.arc(x, y, this.dotR, 0, Math.PI * 2, false);
    this.paint.closePath();
    /*Obtener el color de la ruta al azar*/
    let colors = this.getColor(this.preGroundColor);
    this.paint.fillStyle = "rgba(" + colors[0] + "," + colors[1] + "," + colors[2] + "," + "0.5)";
    /*dibujar*/
    this.paint.fill();
  }
};

/* Método de encuadernación en el prototipo de Captcha
 * Dibujar texto */
Captcha.prototype.font = function () {
  let str = this.getText();
  this.callback(str);
  /*Especificar estilo de texto*/
  let tipoLetra = this.fontFamily[this.getRandom(0, this.fontFamily.length)];
  this.paint.font = this.fontSize + "px " + tipoLetra;
  this.paint.textBaseline = "middle";
  /*Especificar estilo de dibujo de texto*/
  let fontStyle = this.fontStyle + "Text";
  let colorStyle = this.fontStyle + "Style";
  for (let i = 0; i < this.length; i++) {
    let fontWidth = this.paint.measureText(str[i]).width;
    let x = this.getRandom(
      (this.canvas.width / this.length) * i + 0.2 * fontWidth,
      (this.canvas.width / this.length) * i + 0.5 * fontWidth
    );
    /*Obtenga aleatoriamente el ángulo de rotación de la fuente*/
    let deg = this.getRandom(-6, 6);
    /*Obtener color de texto aleatoriamente*/
    let colors = this.getColor(this.preGroundColor);
    this.paint[colorStyle] = "rgba(" + colors[0] + "," + colors[1] + "," + colors[2] + "," + "0.8)";
    /*Empieza a dibujar*/
    this.paint.save();
    this.paint.rotate((deg * Math.PI) / 180);
    this.paint[fontStyle](str[i], x, this.canvas.height / 2);
    this.paint.restore();
  }
};

/* Método de encuadernación en el prototipo de Captcha
 * Dibujar gráficos */
Captcha.prototype.draw = function (dom, callback = function () {}) {
  /*Consigue el dom del lienzo*/
  if (!this.paint) {
    this.canvas = dom;
    if (!this.canvas) return;
    else this.paint = this.canvas.getContext("2d");
    /*La función de devolución de llamada está asignada a este*/
    this.callback = callback;
  }
  /*Color de lienzo aleatorio, usar color de fondo*/
  let colors = this.getColor(this.backGroundColor);
  this.paint.fillStyle = "rgba(" + colors[0] + "," + colors[1] + "," + colors[2] + "," + "0)";

  /*Dibujar lienzo*/
  this.paint.fillRect(0, 0, this.canvas.width, this.canvas.height);

  /*Dibujo*/
  this.circle();
  this.line();
  this.font();
};

/* Recargamos el captcha por medio de una accion */
Captcha.prototype.refresh = function () {
  this.drawAgain();
};

/* Método de encuadernación en el prototipo de Captcha
 * Limpiar el lienzo */
Captcha.prototype.clear = function () {
  this.paint.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

/* Método de encuadernación en el prototipo de Captcha
 * repintar */
Captcha.prototype.drawAgain = function () {
  this.clear();
  this.draw(this.callbak);
};

if (typeof module !== "undefined" && !module.nodeType && module.exports) {
  module.exports = Captcha;
}

export class configuracionCaptcha{
  public lineWidth?: number;              // Ancho de línea
  public lineNum?: number;                // Número de líneas
  public dotR?: number;                   // Radio de los punto
  public dotNum?: number;                 // Número de puntos
  public preGroundColor?: Array<number>;  // Intervalo de color de primer plano, ejemplo [10, 20]
  public backGroundColor?: Array<number>; // Intervalo de color de fondo, ejemplo [150, 250]
  public fontSize?: number;               // tamaño de fuente
  public fontFamily?: Array<string>;      // Tipo de fuente
  public fontStyle?: string;              // Método de dibujo de fuente, hay relleno y trazo
  public content?: string;                // Contenido del código de verificación
  public length?: number                  // Longitud del código de verificación
}

import { Component } from '@angular/core';
import Swal from 'sweetalert2';


interface Color {
  valor: string;
  vistaValor: string;
}
interface Color2 {
  valor2: string;
  vistaValor2: string;
}
interface Multiplicador {
  valorM: string;
  vistaValorM: string;
}
interface Tolerancia {
  valorT: string;
  vistaValorT: string;
}
@Component({
  selector: 'app-resistencia',
  templateUrl: './resistencia.component.html',
  styleUrls: ['./resistencia.component.css']
})
export class ResistenciaComponent {
  title = 'Resistencias';
  valorSeleccionadoBanda1: string = '';
  valorSeleccionadoBanda2: string = '';
  multi: string = '';
  tole: string = '';
  total!: string;
  banda1: Color[] = [
    { valor: '0', vistaValor: 'Negro' },
    { valor: '1', vistaValor: 'Marron' },
    { valor: '2', vistaValor: ' Rojo' },
    { valor: '3', vistaValor: 'Naranja' },
    { valor: '4', vistaValor: 'Amarillo' },
    { valor: '5', vistaValor: 'Verde' },
    { valor: '6', vistaValor: 'Azul' },
    { valor: '7', vistaValor: 'Violeta' },
    { valor: '8', vistaValor: 'Gris' },
    { valor: '9', vistaValor: 'Blanco' }
  ];
  banda2: Color2[] = [
    { valor2: '0', vistaValor2: 'Negro' },
    { valor2: '1', vistaValor2: 'Marron' },
    { valor2: '2', vistaValor2: ' Rojo' },
    { valor2: '3', vistaValor2: 'Naranja' },
    { valor2: '4', vistaValor2: 'Amarillo' },
    { valor2: '5', vistaValor2: 'Verde' },
    { valor2: '6', vistaValor2: 'Azul' },
    { valor2: '7', vistaValor2: 'Violeta' },
    { valor2: '8', vistaValor2: 'Gris' },
    { valor2: '9', vistaValor2: 'Blanco' }
  ];
  multiplicador: Multiplicador[] = [
    { valorM: '1', vistaValorM: 'Negro' },
    { valorM: '10', vistaValorM: 'Marron' },
    { valorM: '100', vistaValorM: ' Rojo' },
    { valorM: '1000', vistaValorM: 'Naranja' },
    { valorM: '10000', vistaValorM: 'Amarillo' },
    { valorM: '100000', vistaValorM: 'Verde' },
    { valorM: '1000000', vistaValorM: 'Azul' },
    { valorM: '10000000', vistaValorM: 'Violeta' },
    { valorM: '100000000', vistaValorM: 'Gris' },
    { valorM: '1000000000', vistaValorM: 'Blanco' },
    { valorM: '0.1', vistaValorM: 'Oro' },
    { valorM: '0.01', vistaValorM: 'Plata' }
  ];
  tolerancia: Tolerancia[] = [
    { valorT: '+-1%', vistaValorT: 'Marron' },
    { valorT: '+-2%', vistaValorT: ' Rojo' },
    { valorT: '+-0.5%', vistaValorT: 'Verde' },
    { valorT: '+-0.25%', vistaValorT: 'Azul' },
    { valorT: '+-0.1%', vistaValorT: 'Violeta' },
    { valorT: '+-0.05%', vistaValorT: 'Gris' },
    { valorT: '+-5%', vistaValorT: 'Oro' },
    { valorT: '+-10%', vistaValorT: 'Plata' }
  ];
  obtenerValor() {
    let resultado = 0;
    let resultadoNumerico = 0;
    let union = '';
    let seleccionCompleta = true;

    if (this.valorSeleccionadoBanda1 === '' && this.valorSeleccionadoBanda2 === '' && this.multi === '' && this.tole === '') {
      seleccionCompleta = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe seleccionar todos los campos!'
      });
    }

    if (seleccionCompleta) {
      union = this.valorSeleccionadoBanda1 + '' + this.valorSeleccionadoBanda2;
      resultado = parseInt(union) * parseInt(this.multi);
      resultadoNumerico = resultado;
    }

    if (seleccionCompleta && !isNaN(resultadoNumerico) && isFinite(resultadoNumerico)) {
      this.total = resultadoNumerico.toString()+"Ohms"+''+ this.tole;
    } else {
      this.total = '';
    }
  }
}



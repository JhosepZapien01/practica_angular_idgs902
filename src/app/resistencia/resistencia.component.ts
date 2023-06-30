import { Component } from '@angular/core';
import Swal from 'sweetalert2';


interface Color {
  valor: string;
  vistaValor: string;
  color: string;
}
interface Color2 {
  valor2: string;
  vistaValor2: string;
  color: string;
}
interface Multiplicador {
  valorM: string;
  vistaValorM: string;
  color: string;
}
interface Tolerancia {
  valorT: string;
  vistaValorT: string;
  color: string;
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
  maximo!: number;
  minimo!: number;
  banda1: Color[] = [
    { valor: '0', vistaValor: 'Negro', color: 'black' },
    { valor: '1', vistaValor: 'Marron', color: 'brown' },
    { valor: '2', vistaValor: ' Rojo', color: 'red' },
    { valor: '3', vistaValor: 'Naranja', color: 'orange' },
    { valor: '4', vistaValor: 'Amarillo', color: 'yellow' },
    { valor: '5', vistaValor: 'Verde', color: 'green' },
    { valor: '6', vistaValor: 'Azul', color: 'blue' },
    { valor: '7', vistaValor: 'Violeta', color: 'purple' },
    { valor: '8', vistaValor: 'Gris', color: 'gray' },
    { valor: '9', vistaValor: 'Blanco', color: 'white' }
  ];
  banda2: Color2[] = [
    { valor2: '0', vistaValor2: 'Negro', color: 'black' },
    { valor2: '1', vistaValor2: 'Marron', color: 'brown' },
    { valor2: '2', vistaValor2: ' Rojo', color: 'red' },
    { valor2: '3', vistaValor2: 'Naranja', color: 'orange' },
    { valor2: '4', vistaValor2: 'Amarillo', color: 'yellow' },
    { valor2: '5', vistaValor2: 'Verde', color: 'green' },
    { valor2: '6', vistaValor2: 'Azul', color: 'blue' },
    { valor2: '7', vistaValor2: 'Violeta', color: 'purple' },
    { valor2: '8', vistaValor2: 'Gris', color: 'gray' },
    { valor2: '9', vistaValor2: 'Blanco', color: 'withe' }
  ];
  multiplicador: Multiplicador[] = [
    { valorM: '1', vistaValorM: 'Negro', color: 'black' },
    { valorM: '10', vistaValorM: 'Marron', color: 'brown' },
    { valorM: '100', vistaValorM: ' Rojo', color: 'red' },
    { valorM: '1000', vistaValorM: 'Naranja', color: 'orange' },
    { valorM: '10000', vistaValorM: 'Amarillo', color: 'yellow' },
    { valorM: '100000', vistaValorM: 'Verde', color: 'green' },
    { valorM: '1000000', vistaValorM: 'Azul', color: 'blue' },
    { valorM: '10000000', vistaValorM: 'Violeta', color: 'purple' },
    { valorM: '100000000', vistaValorM: 'Gris', color: 'gray' },
    { valorM: '1000000000', vistaValorM: 'Blanco', color: 'withe' },
    { valorM: '0.1', vistaValorM: 'Oro', color: 'gold' },
    { valorM: '0.01', vistaValorM: 'Plata', color: 'silver' }
  ];
  tolerancia: Tolerancia[] = [
    { valorT: '1%', vistaValorT: 'Marron', color: 'brown' },
    { valorT: '2%', vistaValorT: ' Rojo', color: 'red' },
    { valorT: '0.5%', vistaValorT: 'Verde', color: 'green' },
    { valorT: '0.25%', vistaValorT: 'Azul', color: 'blue' },
    { valorT: '0.1%', vistaValorT: 'Violeta', color: 'purple' },
    { valorT: '0.05%', vistaValorT: 'Gris', color: 'gray' },
    { valorT: '5%', vistaValorT: 'Oro', color: 'gold' },
    { valorT: '10%', vistaValorT: 'Plata', color: 'silver' }
  ];
  obtenerValor() {
    let resultado = 0;
    let resultadoNumerico = 0;
    let union = '';
    let seleccionCompleta = true;
    let respuestamax = 0;
    let respuestamin = 0;
    if (this.valorSeleccionadoBanda1 === '' && this.valorSeleccionadoBanda2 === '' && this.multi === '' && this.tole === '') {
      seleccionCompleta = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe seleccionar todos los campos!'
      });
    }

    if (seleccionCompleta) {
      union = this.valorSeleccionadoBanda2 + '' + this.valorSeleccionadoBanda1;
      resultado = parseInt(union) * parseInt(this.multi);
      resultadoNumerico = resultado;
    }

    if (seleccionCompleta && !isNaN(resultadoNumerico) && isFinite(resultadoNumerico)) {
      const toleranciaPorcentaje = parseFloat(this.tole);
      const toleranciaDecimal = toleranciaPorcentaje / 100;
      this.total = resultadoNumerico.toString() + " " + "Ohms" + '' + this.tole;
      const min = (resultadoNumerico*toleranciaDecimal)
      const max = (resultadoNumerico*toleranciaDecimal)
      respuestamax = resultadoNumerico + max ;
      respuestamin =resultadoNumerico - min;
      this.maximo = respuestamax;
      this.minimo = respuestamin;
    } else {
      this.total = '';
    }
  }
}



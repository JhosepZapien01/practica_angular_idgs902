import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cinepolis',
  templateUrl: './cinepolis.component.html',
  styleUrls: ['./cinepolis.component.css']
})
export class CinepolisComponent {

  Nombre: string = '';
  Persona: string = '';
  Boleto: string = '';
  respuesta:number=0;
  tarjetaSeleccionada: boolean = true;
  seleccionarTarjeta = [
    { value: true, label: 'Sí' },
    { value: false, label: 'No' }
  ];



  validateInput(event: KeyboardEvent) {
    const pattern = /[A-Za-z]/;
    const inputChar = String.fromCharCode(event.keyCode);

    if (pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
 apagar() {
    let valorInicial=0;
    let descuento1 = 0;
    let descuento2 = 0;
    let descuento3 = 0;
    console.log(this.tarjetaSeleccionada)
    if (parseInt(this.Persona) > 7) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Una Persona no puede solicitar más de 7 Boleto!'
      })
    }
    else {
      if (this.seleccionarTarjeta.find(op => op.value === true)) {
        valorInicial = parseInt(this.Boleto) * 12;
        descuento1 = valorInicial *0.10
        if (parseInt(this.Boleto) > 5) {
          descuento2 = descuento1*0.15
          if (parseInt(this.Boleto) >= 3 || parseInt(this.Boleto) <= 5)
          {
            descuento3 = descuento2*0.10;
            this.respuesta = valorInicial-(descuento1+descuento2+descuento3);
          }
          else
          {
            this.respuesta = valorInicial-(descuento1+descuento2)
          }
        }
        else
        {
          this.respuesta = valorInicial-descuento1
        }
      }
      else {
        if (parseInt(this.Boleto) > 5) {
          descuento2 = descuento1*.15
          if (parseInt(this.Boleto) >= 3 || parseInt(this.Boleto) <= 5) {
            descuento3 = descuento2*0.10;
            this.respuesta = valorInicial-(descuento2+descuento3);
          }
        }
        else {
          if (parseInt(this.Boleto) >= 3 || parseInt(this.Boleto) <= 5) {
            descuento3 = descuento2*0.10;
            this.respuesta = valorInicial-(descuento2+descuento3);
          }
          else {
            this.respuesta =  valorInicial;
          }
        }
      }
    }
  }
}

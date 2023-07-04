import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent {
  nom!: string;
  direc!: string;
  telef!: string;
  nPizzas!: number;
  tamanio!: string;
  ingrePinia!: string;
  ingrePeperoni!: string;
  ingreJamon!: string;
  ingreChampi!: string;
  pedidoForm!: FormGroup;
  mostrarTablaVentas = false;

  ingreJamonSelected = true;
  ingrePiniaSelected = true;
  ingreChampiSelected = true;
  ingrePeperoniSelected = true;


  pedidos: any[] = [];
  nombreEditable = true;
  direccionEditable = true;
  telefonoEditable = true;

  constructor(private readonly fb: FormBuilder) {
    this.pedidoForm = this.initForm();
  }

  onSubmit(): void {
    this.guardarPedido();
    this.nombreEditable = false;
    this.direccionEditable = false;
    this.telefonoEditable =  false;
  }

  guardarPedido() {
    const ingredientes = [
      this.pedidoForm.get('ingrePinia')?.value,
      this.pedidoForm.get('ingreJamon')?.value,
      this.pedidoForm.get('ingrePeperoni')?.value,
      this.pedidoForm.get('ingreChampi')?.value
    ].filter(ingrediente => ingrediente && ingrediente !== '');

    const pedido = {
      nombre: this.pedidoForm.get('nombre')?.value,
      direccion: this.pedidoForm.get('direccion')?.value,
      telefono: this.pedidoForm.get('telefono')?.value,
      numPizzas: this.pedidoForm.get('numPizzas')?.value,
      tamanio: this.pedidoForm.get('tamanio')?.value,
      ingredientes: ingredientes
    };

    this.validarIngredientes(pedido);
    this.calcularPrecioTotal(pedido);
    this.pedidos.push(pedido);

    this.pedidoForm.get('ingreJamon')?.setValue(false);
    this.pedidoForm.get('ingrePinia')?.setValue(false);
    this.pedidoForm.get('ingreChampi')?.setValue(false);
    this.pedidoForm.get('ingrePeperoni')?.setValue(false);
    this.mostrarTablaVentas = false;
  }

  validarIngredientes(pedido: any): string[] {
    const ingredientesPresentes: string[] = [];
    const ingredientesFaltantes: string[] = [];

    if (pedido.ingredientes.includes('jamon')) {
      ingredientesPresentes.push('Jamon');
    } else {
      ingredientesFaltantes.push('Jamon');
    }

    if (pedido.ingredientes.includes('piña')) {
      ingredientesPresentes.push('Piña');
    } else {
      ingredientesFaltantes.push('Piña');
    }

    if (pedido.ingredientes.includes('champinion')) {
      ingredientesPresentes.push('Champiñones');
    } else {
      ingredientesFaltantes.push('Champiñones');
    }

    if (pedido.ingredientes.includes('peperoni')) {
      ingredientesPresentes.push('Peperoni');
    } else {
      ingredientesFaltantes.push('Peperoni');
    }

    console.log('Ingredientes presentes:', ingredientesPresentes);
    console.log('Ingredientes faltantes:', ingredientesFaltantes);

    return ingredientesFaltantes;
  }

  calcularPrecioTotal(pedido: any): number {
    interface PreciosIngredientes {
      [key: string]: number;
    }

    const preciosIngredientes: PreciosIngredientes = {
      jamon: 10,
      piña: 10,
      champinion: 10,
      peperoni: 20
    };

    const preciosTamanio: PreciosIngredientes = {
      chico: 40,
      mediano: 80,
      grande: 120
    };

    let precioTotal = 0;

    if (preciosTamanio.hasOwnProperty(pedido.tamanio)) {
      precioTotal += preciosTamanio[pedido.tamanio];
    }

    for (const ingrediente of pedido.ingredientes) {
      if (preciosIngredientes.hasOwnProperty(ingrediente)) {
        precioTotal += preciosIngredientes[ingrediente];
      }
    }

    precioTotal = precioTotal * pedido.numPizzas;

    console.log('Precio total:', precioTotal);

    return precioTotal;
  }




  terminarPedido() {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Estás seguro de que deseas terminar tu pedido?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoForm.reset();
        this.nombreEditable = true;
        this.direccionEditable = true;
        this.mostrarTablaVentas = true;
        this.telefonoEditable = true;

        const totalVentasPorNombre = this.calcularSubTotalVentasPorNombre();

        let mensaje = 'Pedidos terminados:\n';

        for (const nombre in totalVentasPorNombre) {
          if (totalVentasPorNombre.hasOwnProperty(nombre)) {
            const totalPagar = totalVentasPorNombre[nombre];
            mensaje += `- ${nombre}: $${totalPagar}\n`;
          }
        }

        Swal.fire('Pedidos terminados', mensaje, 'success');
      }
    });
  }

  quitarPedido(index: number) {
    this.pedidos.splice(index, 1);
    this.pedidoForm.get('ingreJamon')?.setValue(false);
    this.pedidoForm.get('ingrePinia')?.setValue(false);
    this.pedidoForm.get('ingreChampi')?.setValue(false);
    this.pedidoForm.get('ingrePeperoni')?.setValue(false);
  }


  calcularSubTotalVentasPorNombre(): { [nombre: string]: number } {
    const totalVentasPorNombre: { [nombre: string]: number } = {};

    for (const pedido of this.pedidos) {
      const nombre = pedido.nombre;
      const subtotal = this.calcularPrecioTotal(pedido);

      if (totalVentasPorNombre.hasOwnProperty(nombre)) {
        totalVentasPorNombre[nombre] += subtotal;
      } else {
        totalVentasPorNombre[nombre] = subtotal;
      }
    }

    return totalVentasPorNombre;
  }


  calcularTotalVentas(): number {
    let totalVentas = 0;

    for (const pedido of this.pedidos) {
      totalVentas += this.calcularPrecioTotal(pedido);
    }

    return totalVentas;
  }


  initForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      numPizzas: ['', [Validators.required]],
      tamanio: ['', [Validators.required]],
      ingrePinia: [''],
      ingreJamon: [''],
      ingrePeperoni: [''],
      ingreChampi: ['']
    });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  ingreJamonSelected = false;
  ingrePiniaSelected = false;
  ingreChampiSelected = false;
  ingrePeperoniSelected = false;


  pedidos: any[] = [];
  nombreEditable = true;
  direccionEditable = true;

  constructor(private readonly fb: FormBuilder) {
    this.pedidoForm = this.initForm();
  }

  onSubmit(): void {
    this.guardarPedido();
    this.nombreEditable = false;
    this.direccionEditable = false;
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

    this.ingreJamonSelected = false;
    this.ingrePiniaSelected = false;
    this.ingreChampiSelected = false;
    this.ingrePeperoniSelected = false;
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
      personal: 40,
      mediano: 80,
      grande: 120
    };

    let precioTotal = 0;

    for (const ingrediente of pedido.ingredientes) {
      if (preciosIngredientes.hasOwnProperty(ingrediente)) {
        precioTotal += preciosIngredientes[ingrediente];
      }
    }

    if (preciosTamanio.hasOwnProperty(pedido.tamanio)) {
      precioTotal += preciosTamanio[pedido.tamanio];
    }

    console.log('Precio total:', precioTotal);

    return precioTotal;
  }

  terminarPedido() {
    this.pedidoForm.reset();
    this.nombreEditable = true;
    this.direccionEditable = true;
  }

  quitarPedido(index: number) {
    this.pedidos.splice(index, 1);
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

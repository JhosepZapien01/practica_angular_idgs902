import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ResistenciaComponent } from './resistencia/resistencia.component';
import { DistanciaComponent } from './distancia/distancia.component';
import { CinepolisComponent } from './cinepolis/cinepolis.component';
import { PizzaComponent } from './pizza/pizza.component';

const routes:Routes=[
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'resistencia',component: ResistenciaComponent},
  {path: 'distancia', component:DistanciaComponent },
  {path: 'cinepolis', component: CinepolisComponent },
  {path: 'pizza', component: PizzaComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }

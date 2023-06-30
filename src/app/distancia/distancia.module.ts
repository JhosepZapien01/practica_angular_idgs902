import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistanciaComponent } from './distancia.component';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatButtonModule}from '@angular/material/button';
import {MatRadioModule}from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatListModule}from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    DistanciaComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatListModule,
    MatSelectModule
  ],
  exports:[
    DistanciaComponent
  ]
})
export class DistanciaModule { }

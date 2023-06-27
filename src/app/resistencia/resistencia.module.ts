import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResistenciaComponent } from './resistencia.component';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatButtonModule}from '@angular/material/button';
import {MatRadioModule}from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatListModule}from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    ResistenciaComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    MatFormFieldModule,
    MatListModule,
    MatSelectModule,
    MatCardModule
  ],
  exports:[
    ResistenciaComponent
  ]
})
export class ResistenciaModule {}


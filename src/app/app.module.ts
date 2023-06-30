import { CinepolisModule } from './cinepolis/cinepolis.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResistenciaModule } from './resistencia/resistencia.module';
import { DistanciaModule } from './distancia/distancia.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ResistenciaModule,
    CinepolisModule,
    DistanciaModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

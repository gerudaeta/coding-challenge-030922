import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './componentes/timer/timer.component';
import { TableComponent } from './componentes/table/table.component';



@NgModule({
  declarations: [
    TimerComponent,
    TableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
  declarations: [],
  imports: [
    MatRadioModule,
    CommonModule
  ],
  exports: [
    MatRadioModule
  ]
})
export class SharedModule { }

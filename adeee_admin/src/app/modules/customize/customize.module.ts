import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizeRoutingModule } from './customize-routing.module';
import { CustomizeComponent } from './customize.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListCustomizeComponent } from './list-customize/list-customize.component';

@NgModule({
  declarations: [CustomizeComponent, ListCustomizeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomizeRoutingModule  
  ]
})
export class CustomizeModule { }


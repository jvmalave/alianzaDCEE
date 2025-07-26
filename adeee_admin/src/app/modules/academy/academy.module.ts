import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademyRoutingModule } from './academy-routing.module';
import { AcademyComponent } from './academy.component';
import { ListCoursesComponent } from './list-courses/list-courses.component';


@NgModule({
  declarations: [AcademyComponent, ListCoursesComponent],
  imports: [
    CommonModule,
    AcademyRoutingModule
  ]
})
export class AcademyModule { }

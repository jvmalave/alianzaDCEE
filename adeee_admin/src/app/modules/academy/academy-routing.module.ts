import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcademyComponent } from './academy.component';
import { ListCoursesComponent } from './list-courses/list-courses.component';

const routes: Routes = [
  
{
path: '',
component: AcademyComponent,
children:[
  {
    path: 'lista-de-cursos',
    component: ListCoursesComponent,
  }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademyRoutingModule { }

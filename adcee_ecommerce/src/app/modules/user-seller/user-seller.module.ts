import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSellerRoutingModule } from './user-seller-routing.module';
import { AddNewUserSellerComponent } from './add-new-user-seller/add-new-user-seller.component';


@NgModule({
  declarations: [
    AddNewUserSellerComponent
  ],
  imports: [
    CommonModule,
    UserSellerRoutingModule
  ]
})
export class UserSellerModule { }

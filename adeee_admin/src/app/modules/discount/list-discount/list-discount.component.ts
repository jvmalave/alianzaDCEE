import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DiscountService } from '../_services/discount.service';
import { DeleteNewDiscountComponent } from '../delete-new-discount/delete-new-discount.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-discount',
  templateUrl: './list-discount.component.html',
  styleUrls: ['./list-discount.component.scss']
})
export class ListDiscountComponent implements OnInit {

  isLoading$: any = null;
    search: any = "";
    discounts: any = [];
  
    constructor(
      public _discountService: DiscountService,
      public router: Router,
      public modalService: NgbModal,
      public datePipe: DatePipe
    ) { }
  
    ngOnInit(): void {
      this.allDiscounts();
      this.isLoading$ = this._discountService.isLoading$;
  
    }
  
    allDiscounts() {
      this._discountService.allDiscounts(this.search).subscribe((resp:any) => {
        console.log(resp);
        this.discounts = resp.discounts;
      })
  
    }
  
    refresh() {
      this.search = "";
      this.allDiscounts();
  
    }
  
    editDiscount(descuento) {
      this.router.navigateByUrl("/descuento/editar-descuento/"+descuento._id);
  
    }

    getParseDate(date){
      return this.datePipe.transform(date, "dd-MM-yyyy", "UTC");
    }
  
    delete(discount) {
      const modalRef = this.modalService.open(DeleteNewDiscountComponent,{centered:true, size:'md'});
      
          modalRef.componentInstance.discount_selected = discount;
      
          modalRef.componentInstance.DiscountD.subscribe((resp:any) => {
            let index = this.discounts.findIndex(item => item._id == discount._id);
            if(index != -1){
              this.discounts.splice(index,1);
            }
          })
  
    }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-delete-new-product',
  templateUrl: './delete-new-product.component.html',
  styleUrls: ['./delete-new-product.component.scss']
})
export class DeleteNewProductComponent implements OnInit {

  @Output() productD: EventEmitter<any> = new EventEmitter();
    @Input() product:any;
    
    constructor(
      public modal: NgbActiveModal,
      public productService: ProductService,
      public toaster: Toaster,
    ) { }
  
    ngOnInit(): void {
    }
  
    delete(){
      this.productService.deleteProduct(this.product._id).subscribe((resp:any) => {
        console.log(resp);
        this.productD.emit("");
        this.modal.close();
      },(error) =>{
        if(error.error){
          this.toaster.open(NoticyAlertComponent,{text: `danger-'${error.error.message}'`});
        }
      })
    }

}

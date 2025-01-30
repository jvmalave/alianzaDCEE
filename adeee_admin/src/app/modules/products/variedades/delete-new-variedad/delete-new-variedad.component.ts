import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-delete-new-variedad',
  templateUrl: './delete-new-variedad.component.html',
  styleUrls: ['./delete-new-variedad.component.scss']
})
export class DeleteNewVariedadComponent implements OnInit {

  @Output() variedadD: EventEmitter<any> = new EventEmitter();
  @Input() variedad:any;
  
  constructor(
    public modal: NgbActiveModal,
    public productService: ProductService,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.productService.deleteVariedad(this.variedad._id).subscribe((resp:any) => {
      console.log(resp);
      this.variedadD.emit("");
      this.modal.close();
    },(error) =>{
      if(error.error){
        this.toaster.open(NoticyAlertComponent,{text: `danger-'${error.error.message}'`});
      }
    })
  }
}





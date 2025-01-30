import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-edit-new-variedad',
  templateUrl: './edit-new-variedad.component.html',
  styleUrls: ['./edit-new-variedad.component.scss']
})
export class EditNewVariedadComponent implements OnInit {
 
  @Output() variedadE: EventEmitter<any> = new EventEmitter();
  @Input() variedad:any;

  isLoading$:any;
  variedad_multiple:any = null;
  constructor(
    public modal:NgbActiveModal,
    public _serviceProduct: ProductService,
  
  ) { }

  ngOnInit(): void {
    this.variedad_multiple = this.variedad.valor;
  }
  update() {
    let data = {
      _id: this.variedad._id,
      valor: this.variedad_multiple,
    }

    this._serviceProduct.updateVariedad(data).subscribe((resp:any) => {
      console.log(resp);
      this.variedadE.emit(resp.variedad);
      this.modal.close();

    })
  }
}

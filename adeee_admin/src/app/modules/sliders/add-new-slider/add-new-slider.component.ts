import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SliderService } from '../_services/slider.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';

@Component({
  selector: 'app-add-new-slider',
  templateUrl: './add-new-slider.component.html',
  styleUrls: ['./add-new-slider.component.scss']
})
export class AddNewSliderComponent implements OnInit {

   @Output() SliderC: EventEmitter<any> = new EventEmitter();
    isLoading$:any = null;
    name:any = null;
    link:any = null;
    imagen_file:any = null;
    imagen_previzualizacion:any = null;
    
  
    constructor(
      public _sliderService:SliderService,
      public modal:NgbActiveModal,
      public toaster: Toaster,
    ) { }
  
    ngOnInit(): void {
    }
  
    processFile($event:any){
      if($event.target.files[0].type.indexOf("image") < 0){
        this.imagen_previzualizacion = null;
        this.toaster.open(NoticyAlertComponent,{text: `danger-'Upss! Necesita ingresar un archivo de tipo imagen '`});
        return;
      }
    this.imagen_file = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.imagen_file);
    reader.onloadend = () => this.imagen_previzualizacion = reader.result;
    }
  
    save(){
      if(!this.name || !this.imagen_file || !this.link ){
        this.toaster.open(NoticyAlertComponent,{text: `danger-'Upss! Necesita ingresar todos los campos'`});
      }
      let formData = new FormData();
      formData.append('title', this.name);
      formData.append('link', this.link);
      formData.append('portada', this.imagen_file);
  
      //
      this._sliderService.createSlider(formData).subscribe((resp:any) => {
        console.log(resp);
        this.SliderC.emit(resp);
  
        this.modal.close();
      })
    }

}

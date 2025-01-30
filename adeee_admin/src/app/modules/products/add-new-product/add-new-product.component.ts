import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { ProductService } from '../_services/product.service';
import { CategoriesService } from '../../categories/_services/categories.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

  title:any = null;
  sku: any = null;
  categories: any = [];
  categorie: any = "";
  condition: any = "";
  price_usd: any = 0;
  price_bs: any = 0;
  imagen_previzualizacion: any = null;
  imagen_file: any = null;
  description: any = null;
  resumen: any = null;
  //
  tag:any = null;
  tags: any = [];

  isloading$: any;


  constructor(
    public _productService:ProductService,
    public _categorieService:CategoriesService,
    public toaster:Toaster
  ) { }

  ngOnInit(): void {
    this.isloading$ = this._productService.isLoading$;
    this._categorieService.allCategories().subscribe((resp:any) =>{
      console.log(resp);
      this.categories = resp.categories;
      this.loadServices();
    })
  }

  loadServices(){
    this._productService.isLoadingSubject.next(true);
    setTimeout(() => {
      this._productService.isLoadingSubject.next(false);
    },50);
  }
    

  processFile($event){
    if($event.target.files[0].type.indexOf("image") < 0){
          this.imagen_previzualizacion = null;
          this.toaster.open(NoticyAlertComponent,{text: `danger-'Upss! Necesita ingresar un archivo de tipo imagen '`});
          return;
        }
      this.imagen_file = $event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.imagen_file);
      reader.onloadend = () => this.imagen_previzualizacion = reader.result;
      this.loadServices();
      }

      addTag(){
        this.tags.push(this.tag);
        this.tag = "";
      }

      removeTag(i){
        this.tags.splice(i,1);
      }
      save(){
        if(!this.title || !this.categorie || !this.price_bs || !this.price_usd || !this.condition || !this.description || !this.resumen || !this.sku || this.tags.length == 0 || !this.imagen_file){
          this.toaster.open(NoticyAlertComponent,{text: `danger-'Upss! Necesita ingresar todos los campos del formulario'`});
          return;
        }
        let formData = new FormData();
        formData.append("title", this.title);
        formData.append("categorie", this.categorie);
        formData.append("price_bs", this.price_bs);
        formData.append("price_usd", this.price_usd);
        formData.append("condition", this.condition);
        formData.append("description", this.description);
        formData.append("resumen", this.resumen);
        formData.append("sku", this.sku);
        formData.append("tags", JSON.stringify(this.tags));
        formData.append("imagen", this.imagen_file);

        this._productService.createProduct(formData).subscribe((resp:any) => {
          console.log(resp);

          if(resp.code == 403){
            this.toaster.open(NoticyAlertComponent,{text: `danger-'Upss! El producto ya existe, agregue otro nombre'`});
            return;
          }else{
            this.toaster.open(NoticyAlertComponent,{text: `success-'Super! El producto se ha registrado satisfactoriamente'`});
            this.title = null;
            this.categorie = null;
            this.price_bs = null;
            this.price_usd = null;
            this.condition = null;
            this.description = null;
            this.resumen = null;
            this.sku = null;
            this.tags = [];
            this.imagen_file = null;
            this.imagen_previzualizacion = null;
            return;
          }
        })
      }
  }





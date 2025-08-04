import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { ProductService } from '../_services/product.service';
import { CategoriesService } from '../../categories/_services/categories.service';
import { AuthService } from '../../auth/_services/auth.service';
import { CustomizeService } from '../../customize/services/customize.service';

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
  tasaCambio_bcv = 0;
  imagen_previzualizacion: any = null;
  imagen_file: any = null;
  description: any = null;
  resumen: any = null;
  //
  tag:any = null;
  tags: any = [];
  seller_id: any = 0;

  isloading$: any;


  constructor(
    public _productService:ProductService,
    public _categorieService:CategoriesService,
    public toaster:Toaster,
    private _authService:AuthService,
    public _customizeService:CustomizeService
  ) { }

  ngOnInit(): void {
    this.isloading$ = this._productService.isLoading$;
    this._categorieService.allCategories().subscribe((resp:any) =>{
      console.log(resp);
      this.categories = resp.categories;
      this.loadServices();
    })
    
    this.price_usd = 0;
    this.seller_id = this._authService.user._id
    console.log("SELLER", this.seller_id)
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
          this.toaster.open(NoticyAlertComponent,{text: `danger-'Upss! Necesita ingresar un archivo de tipo imagen'`});
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

  save() {
    if (!this.title) {
    this.toaster.open(NoticyAlertComponent, { text: `danger-'Ingrese el título del producto.'` });
    return;
    }
    if (!this.sku) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-'Ingrese el SKU del producto.'` });
      return;
    }
    if (!this.categorie) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-'Seleccione una categoría.'` });
      return;
    }
    if (!this.condition) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-'Seleccione la condicion.'` });
      return;
    }
    // Validar price_bs y price_usd solo si la condición no es "Donación" (3)
    if (this.condition !== "3") {
      // const priceBsNum = Number(this.price_bs);
      // if (this.price_bs === null || this.price_bs === undefined || isNaN(priceBsNum)) {
      //   this.toaster.open(NoticyAlertComponent, { text: `danger-'Ingrese un precio en Bs, debe ser válido (solo números).'` });
      //   return;
      // }
      // if (this.price_bs <=0) {
      //   this.toaster.open(NoticyAlertComponent, { text: `danger-'El precio en Bs no puede ser negativo o igual a 0.'` });
      //   return;
      // }
      const priceUsdNum = Number(this.price_usd);
      if (this.price_usd === null || this.price_usd === undefined || isNaN(priceUsdNum)) {
        this.toaster.open(NoticyAlertComponent, { text: `danger-'Ingrese un precio en USD, debe ser válido (solo números).'` });
        return;
      }
      if (this.price_usd <= 0) {
        this.toaster.open(NoticyAlertComponent, { text: `danger-'El precio en USD no puede ser negativo o igual a 0.'` });
        return;
      }
    }
    if (!this.imagen_file) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-'Debe cargar una imagen del producto.'` });
      return;
    }
    if (!this.resumen) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-'Ingrese el resumen del producto.'` });
      return;
    }
    if (!this.description) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-'Ingrese la descripción del producto.'` });
      return;
    }
    if (!this.tags || this.tags.length === 0) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-'Agregue al menos una etiqueta.'` });
      return;
    }
  
  // Verifica si la condición es "Donación" (3)
  if (this.condition === "3") {
    this.price_bs = 0;
    this.price_usd = 0;
  }

  let formData = new FormData();
  formData.append("title", this.title);
  formData.append("categorie", this.categorie);
  formData.append("price_bs", String(this.price_bs)); // Convertir a String
  formData.append("price_usd", String(this.price_usd)); // Convertir
  formData.append("condition", this.condition);
  formData.append("description", this.description);
  formData.append("resumen", this.resumen);
  formData.append("sku", this.sku);
  formData.append("tags", JSON.stringify(this.tags));
  formData.append("imagen", this.imagen_file);
  formData.append("seller_id", this.seller_id);

  this._productService.createProduct(formData).subscribe({
      next: (resp: any) => {
        console.log("CREATE", resp);

        if (resp.code === 403) {
          this.toaster.open(NoticyAlertComponent, { text: `danger-'Upss! El producto ya existe, agregue otro nombre'` });
          return;
        } else {
          this.toaster.open(NoticyAlertComponent, { text: `success-'Super! El producto se ha registrado satisfactoriamente. satisfactoriamente'` });
          // Limpia campos para nuevo producto
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
        }
      },
    });
  }
}






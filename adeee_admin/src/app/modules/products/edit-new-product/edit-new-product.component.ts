import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../categories/_services/categories.service';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditNewVariedadComponent } from '../variedades/edit-new-variedad/edit-new-variedad.component';
import { DeleteNewVariedadComponent } from '../variedades/delete-new-variedad/delete-new-variedad.component';
import { DeleteGaleriaImagenComponent } from '../delete-galeria-imagen/delete-galeria-imagen.component';

@Component({
  selector: 'app-edit-new-product',
  templateUrl: './edit-new-product.component.html',
  styleUrls: ['./edit-new-product.component.scss']
})
export class EditNewProductComponent implements OnInit {

  product_id: any = null;
  product_selected= null;


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
  state: any = 1;
  //
  tag:any = null;
  tags: any = [];

  isloading$: any;
  type_inventario: any = 1;
  stock: any = 0;
  stock_multiple: any = 0;
  valor_multiple: any = ""; 

  variedades:any =[];

  imagen_previz_galeria:any = null;
  imagen_file_galeria:any = null;
  galerias:any = [];



  constructor(
    public _productService:ProductService,
    public router: Router,
    public _categorieService:CategoriesService,
    public activeRouter:ActivatedRoute,
    public toaster: Toaster,
    public modalService: NgbModal,

    
  ) { }

  ngOnInit(): void {
    this.isloading$ = this._productService.isLoading$;
    this.activeRouter.params.subscribe((resp:any) => {
      console.log(resp);
      this.product_id = resp.id
    });

    this._productService.showProduct(this.product_id).subscribe((resp:any) => {
      console.log(resp);
      this.product_selected = resp.product;

      this.title = this.product_selected.title;
      this.sku = this.product_selected.sku;
      this.categorie = this.product_selected.categorie;
      this.condition = this.product_selected.condition;
      this.price_usd = this.product_selected.price_usd;
      this.price_bs = this.product_selected.price_bs;
      this.stock = this.product_selected.stock;

      this.imagen_previzualizacion = this.product_selected.imagen;
      this.description = this.product_selected.description;
      this.resumen = this.product_selected.resumen;
      this.tags = this.product_selected.tags;
      this.variedades = this.product_selected.variedades;
      this.type_inventario = this.product_selected.type_inventario;
      this.state = this.product_selected.state;
      this.galerias = this.product_selected.galerias;
    })

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

  processFileGaleria($event){
    if($event.target.files[0].type.indexOf("image") < 0){
      this.imagen_previz_galeria = null;
      this.toaster.open(NoticyAlertComponent,{text: `danger-'Upss! Necesita ingresar un archivo de tipo imagen '`});
      return;
    }
    this.imagen_file_galeria = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.imagen_file_galeria);
    reader.onloadend = () => this.imagen_previz_galeria = reader.result;
    this.loadServices();
  }

  addTag(){
    this.tags.push(this.tag);
    this.tag = "";
  }

  removeTag(i){
    this.tags.splice(i,1);
  }

  update() {
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
      const priceBsNum = Number(this.price_bs);
      if (this.price_bs === null || this.price_bs === undefined || isNaN(priceBsNum)) {
        this.toaster.open(NoticyAlertComponent, { text: `danger-'Ingrese un precio en Bs, debe ser válido (solo números).'` });
        return;
      }
      if (this.price_bs <=0) {
        this.toaster.open(NoticyAlertComponent, { text: `danger-'El precio en Bs no puede ser negativo o igual a 0.'` });
        return;
      }
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
  // if(!this.title || !this.categorie || (this.condition !== "3" && (!this.price_bs || !this.price_usd)) || !this.description || !this.resumen || !this.sku || this.tags.length == 0) {
  //   this.toaster.open(NoticyAlertComponent, { text: `danger-'Upss! Necesita ingresar todos los campos del formulario'`});
  //   return;
  // }

  // Verifica si la condición es "Donación" (3)
  if (this.condition === "3") {
    this.price_bs = 0;
    this.price_usd = 0;
  }
  let formData = new FormData();
  formData.append("_id", this.product_id);
  formData.append("title", this.title);
  formData.append("categorie", this.categorie);
  formData.append("price_bs", String(this.price_bs)); // Convertir a String
  formData.append("price_usd", String(this.price_usd)); // Convertir a String
  formData.append("condition", this.condition);
  formData.append("description", this.description);
  formData.append("resumen", this.resumen);
  formData.append("state", this.state);
  formData.append("sku", this.sku);
  formData.append("type_inventario", this.type_inventario);
  formData.append("tags", JSON.stringify(this.tags));
  formData.append("stock", String(this.stock)); // Asegúrate que sea string
  if (this.imagen_file) {
    formData.append("imagen", this.imagen_file);
  }

  this._productService.updateProduct(formData).subscribe({
    next: (resp: any) => {
      console.log("UPDATE", resp);

      if (resp.code === 403) {
        this.toaster.open(NoticyAlertComponent, { text: `danger-'Upss! El producto ya existe, agregue otro nombre'` });
        return;
      } else {
        this.toaster.open(NoticyAlertComponent, { text: `success-'Super! El producto se ha actualizado satisfactoriamente'` });
        // Opcional: puedes limpiar campos o actualizar la vista aquí si lo deseas
        return;
      }
    },
    error: (error) => {
      console.error("ERROR UPDATE", error);
      // Captura los errores que envía el backend, por ejemplo errores de validación numérica
      if (error.status === 400 && error.error && error.error.message) {
        this.toaster.open(NoticyAlertComponent, { text: `danger-'${error.error.message}'` });
      } else {
        this.toaster.open(NoticyAlertComponent, { text: `danger-'Ocurrió un error inesperado. Intente más tarde.'` });
      }
    }
  });
}


  // update(){
  //   if(!this.title || !this.categorie || (this.condition !== "3" && (!this.price_bs || !this.price_usd)) || !this.description || !this.resumen || !this.sku || this.tags.length == 0) {
  //     this.toaster.open(NoticyAlertComponent,{text: `danger-'Upss! Necesita ingresar todos los campos del formulario'`});
  //     return;
  //   }

  //    Verifica si la condición es "Donación" (3)
  //   if (this.condition === "3") {
  //     this.price_bs = 0;
  //     this.price_usd = 0;
  //   }

  //   let formData = new FormData();
  //   formData.append("_id", this.product_id);
  //   formData.append("title", this.title);
  //   formData.append("categorie", this.categorie);
  //   formData.append("price_bs", String(this.price_bs)); // Convertir a String
  //   formData.append("price_usd", String(this.price_usd)); // Convertir
  //   formData.append("condition", this.condition);
  //   formData.append("description", this.description);
  //   formData.append("resumen", this.resumen);
  //   formData.append("state", this.state);
  //   formData.append("sku", this.sku);
  //   formData.append("type_inventario",this.type_inventario);
  //   formData.append("tags", JSON.stringify(this.tags));
  //   formData.append("stock", this.stock);
  //   if(this.imagen_file){
  //     formData.append("imagen", this.imagen_file);
  //   }

  //   this._productService.updateProduct(formData).subscribe((resp:any) => {
  //     console.log(resp);

  //     if(resp.code == 403){
  //       this.toaster.open(NoticyAlertComponent,{text: `danger-'Upss! El producto ya existe, agregue otro nombre'`});
  //       return;
  //     }else{
  //       this.toaster.open(NoticyAlertComponent,{text: `success-'Super! El producto se ha actualizaado satisfactoriamente'`});
  //       return;
  //     }
  //   })
  // }

  listProducts(){
    this.router.navigateByUrl("/productos/lista-de-productos");
  }

  checkedInventario(value){
    this.type_inventario = value;
  }

  saveVariedad(){ 
    if(!this.valor_multiple || !this.stock_multiple){
      this.toaster.open(NoticyAlertComponent,{text: `danger-'Upss! Debe agregar un valor y una cantidad'`});
      return;
    }
    let data = {
      product: this.product_id,
      valor: this.valor_multiple,
      stock: this.stock_multiple,
    }

    this._productService.createVariedad(data).subscribe((resp:any) => {
      console.log(resp);
      this.valor_multiple = null;
      this.stock_multiple = null;
      let index = this.variedades.findIndex(item => item._id == resp.variedad._id);
      if(index != -1){
        this.variedades[index] = resp.variedad;
        this.toaster.open(NoticyAlertComponent,{text:`success-'Super! La variedad se  actualizó satisfactoriamente'`});
      }else{
        this.variedades.unshift(resp.variedad)
        this.toaster.open(NoticyAlertComponent,{text: `success-'Super! La variedad se registró satisfactoriamente'`});
      }
    })

  }

  editVariedad(variedad){
    const modalRef = this.modalService.open(EditNewVariedadComponent,{centered:true, size:'md'});

    modalRef.componentInstance.variedad = variedad;

    modalRef.componentInstance.variedadE.subscribe((variedadE:any) => {
      let index = this.variedades.findIndex(item => item._id == variedadE._id);
      if(index != -1){
        this.variedades[index] = variedadE;
        this.toaster.open(NoticyAlertComponent,{text:`success-'Super! La variedad se  actualizó satisfactoriamente'`});
      }
    })
  }
  deleteVariedad(variedad:any){
    const modalRef = this.modalService.open(DeleteNewVariedadComponent,{centered:true, size:'md'});

    modalRef.componentInstance.variedad = variedad;

    modalRef.componentInstance.variedadD.subscribe((resp:any) => {
      let index = this.variedades.findIndex(item => item._id == variedad._id);
      if(index != -1){
        this.variedades.splice(index,1);
        this.toaster.open(NoticyAlertComponent,{text:`success-'Super! La variedad se eliminó satisfactoriamente'`});
      }
    })
  }

  storeImagen(){
    if(!this.imagen_file_galeria){
      this.toaster.open(NoticyAlertComponent,{text:`danger-'Upss! Necesita ingresar un archivo de tipo imagen'`});
      return;
    }
    let formData = new FormData();
    formData.append("_id",this.product_id);
    formData.append("imagen",this.imagen_file_galeria);
    formData.append('__id', new Date().getTime().toString());
    this._productService.createGaleria(formData).subscribe((resp:any) => {
      console.log(resp);
      this.imagen_file_galeria = null;
      this.imagen_previz_galeria = null;
      this.galerias.unshift(resp.imagen);
    })
  }

  removeImagen(imagen){
    const modalRef = this.modalService.open(DeleteGaleriaImagenComponent,{centered:true, size:'sd'});

    modalRef.componentInstance.imagen = imagen;
    modalRef.componentInstance.product_id = this.product_id;

    modalRef.componentInstance.imagenD.subscribe((resp:any) => {
      let index = this.galerias.findIndex(item => item._id == imagen._id);
      if(index != -1){
        this.galerias.splice(index,1);
        this.toaster.open(NoticyAlertComponent,{text:`success-'Super! La imagen se eliminó satisfactoriamente'`});
      }
    })

  }
}

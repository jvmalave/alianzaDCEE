import mongoose,{Schema}  from "mongoose";

const ProductSchema = new Schema({
  title:{type:String, required:true, maxlength:250},
  slug:{type:String, required:true, maxlength:1000},
  sku: {type:String, required:true, maxlength:250},
  categorie:{type:Schema.ObjectId, ref:'categorie', required:true},
  price_bs: {type:Number, required:true},
  price_usd: {type:Number, required:true},
  portada:{type:String, required:true, maxlength:250},
  galerias:[{type:Object, required:false}],
  state:{type:Number, default:1}, //(1: Demo, 2:publico, 3: anulado)
  stock: {type:Number, default:0},
  description:{type:String, required:true},
  resumen:{type:String, required:true},
  tags:{type:String, required:true},
  type_inventario:{type:Number, default:1}, // 1: unico, 2: multiple
  condition:{type:Number, required:true} // 1:nuevo, 2:usado, 3:donacion
},{
  timestamps:true,
});

const Product = mongoose.model('product',ProductSchema);

export default Product;
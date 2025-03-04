import mongoose,{Schema} from "mongoose";

const SaleDetailSchema = new Schema({
    sale: {type: Schema.ObjectId,ref: 'sale',required:true},
    product: {type: Schema.ObjectId, ref: 'product',required:true},
    type_discount: {type:Number,required:false,default: 1},//1 es por porcentaje y 2 es por moneda
    discount:{type:Number,default: 0},//50%
    cantidad: {type:Number,required:true},//2
    variedad: {type:Schema.ObjectId, ref: 'variedad', required: false},
    code_cupon: {type:String,required:false},
    code_discount: {type:String,required:false},
    price_unit: {type:Number,required:true},//60
    subtotal: {type:Number,required:true},//30
    total: {type:Number,required:true},//60
},{
    timestamps:true,
});

const SaleDetail = mongoose.model("sale_detail",SaleDetailSchema);

export default SaleDetail;
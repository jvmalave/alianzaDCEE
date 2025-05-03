import mongoose,{Schema} from "mongoose";

const SaleSchema = new Schema({
    user:{type: Schema.ObjectId,ref:'user',required:true},
    currency_payment:{type: String,default: 'USD'},
    method_payment:{type:String,maxlength: 50,required:true},
    n_transaction: {type:String,maxlength: 200,required:true},
    name_bank: {type:String, maxlength:200},
    number_phone: {type:String, maxlength: 12},
    id_card_number: {type: String, maxlength: 8},
    total:{type:Number,required:true},
    // 
    currency_total: {type: String, maxlength: 50, default: 'USD'},
    price_dolar:{type:Number,default: 0},
},{
    timestamps: true,
});

const Sale = mongoose.model("sale",SaleSchema);

export default Sale;
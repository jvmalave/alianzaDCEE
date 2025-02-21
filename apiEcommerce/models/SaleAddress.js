import mongoose,{Schema} from "mongoose";

const SaleAddressSchema = new Schema({
    sale:{type:Schema.ObjectId,ref: 'sale',required:true},
    name:{type:String,maxlength : 250,required:true},
    surname:{type:String,maxlength : 250,required:true},
    country:{type:String,maxlength: 250, required:true},
    address:{type:String,maxlength: 250, required:true},
    reference:{type:String,maxlength: 250, required:false},
    city:{type:String,maxlength: 250, required:true},
    region:{type:String,maxlength: 250, required:true},
    township:{type: String, required:true, maxlength: 250},
    phone:{type:String,maxlength: 250, required:true},
    email:{type:String,maxlength: 250, required:true},
    note:{type:String, required:false},
    
},{
    timestamps: true
});

const SaleAddress = mongoose.model("sale_address",SaleAddressSchema);
export default SaleAddress;
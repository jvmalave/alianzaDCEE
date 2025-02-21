import mongoose,{Schema} from "mongoose";

const AddressClientSchema =  new Schema({
  user: {type: Schema.ObjectId, ref:'user', required: true},
  name:{type: String, required:true, maxlength: 250},
  surname:{type: String, required:true, maxlength: 250},
  country:{type: String, required:true, maxlength: 250, default:"Venezuela"},
  region:{type: String, required:true, maxlength: 250},
  city:{type: String, required:true, maxlength: 250},
  township:{type: String, required:true, maxlength: 250},
  address:{type: String, required:true, maxlength: 250},
  reference:{type: String, required:false, maxlength: 250},
  phone:{type: String, required:true, maxlength: 250},
  email:{type: String, required:true, maxlength: 250},
  note:{type: String, required:false},

},{
  timestamps: true,
})

const AddressClient = mongoose.model("address_client", AddressClientSchema);
export default AddressClient;
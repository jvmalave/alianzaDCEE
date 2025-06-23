import mongoose,{Schema} from "mongoose";

const UserSchema = new Schema({
  rol: {type: String, maxlength:30, require:true}, // admin |cliente | emprendedor
  name: {type: String, maxlength:50, require:true},
  surname: {type: String, maxlength:50, require:false},
  company: {type: String, maxlength: 50, require:false},
  nif: { type: String, maxlength: 20, require: false},
  description_company: {type: String, maxlength: 250, require:false},
  address: { type: String, maxlength: 250, require:false},
  email: {type: String, maxlength:50, require:true, unique:true},
  password: {type: String, maxlength:250, require:true},
  acceptTerms: {type: Boolean, require:false},
  avatar: {type: String, maxlength:250, require:false},
  state: {type: Number, default:1},// 1 es activo y 2 es desactivo
  phone: {type: String, maxlength:20, require:false},
  birthday: {type: String, maxlength:250, require:false},
},{
  timestamps:true
});

const User = mongoose.model("user", UserSchema);
export default User
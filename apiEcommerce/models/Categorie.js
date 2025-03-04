import mongoose,{Schema} from "mongoose";

const CategorieSchema = new Schema({
  title:{type:String, maxlength:250,required:true},
  imagen:{type:String,maxlength:250,required:true},
  state:{type: Number,maxlength:2,default:1},// 1 es activo y 2 es desactivo
},{
  timestamps:true
});

const Categorie = mongoose.model("categorie",CategorieSchema);
export default Categorie;
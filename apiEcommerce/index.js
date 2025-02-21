import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import router from "./router";

//CONEXION A LA BASE DE DATOS db_adcee

const dburl = "mongodb://127.0.0.1:27017/db_adcee";



mongoose.connect(dburl)
  .then(() => console.log("CONECTADO A LA BD db_adcee en el puerto 27017"))
  .catch(err => console.log(err));



//DECLARACION EXPRESS
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/', router);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => { 
  console.log("EL SERVIDOR SE EJECUTA PERFECTAMENTE EN EL PUERTO 3000");
});

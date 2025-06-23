import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import router from "./router";
import 'dotenv/config'

//console.log(process.env)

//CONEXION A LA BASE DE DATOS db_adcee

const dburl = "mongodb://127.0.0.1:27017/db_adcee";
mongoose.Promise = global.Promise;
//const dburl = "mongodb+srv://malavemjv:guayoyo@adccedb.z6dz1.mongodb.net/db_adcee";



mongoose.connect(
  dburl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CONECTADO A LA BD db_adcee en el puerto 27017"))
  .catch(err => console.log(err));



//DECLARACION EXPRESS
const app = express();
app.use(cors(
));
const corsOptions = [
  {
    origin: 'http://localhost:5000',  // Cambia si usas otra URL o dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'], // incluye 'token' si lo usas en headers
    credentials: true, // si usas cookies o autenticación basada en credenciales
  },
  {
    origin: 'http://localhost:4200',  // Cambia si usas otra URL o dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'], // incluye 'token' si lo usas en headers
    credentials: true, // si usas cookies o autenticación basada en credenciales
  },
];
app.use(cors(corsOptions));

app.use(express.json());

import paymentRoutes from './router/Payment';
app.use('/api/payment', paymentRoutes);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/', router);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => { 
  console.log("EL SERVIDOR SE EJECUTA PERFECTAMENTE EN EL PUERTO 3000");
});

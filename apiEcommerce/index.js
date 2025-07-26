import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import router from "./router";
import paymentRoutes from './router/Payment';
import 'dotenv/config'

//console.log(process.env)

//CONEXION A LA BASE DE DATOS db_adcee

//const dburl = "mongodb://127.0.0.1:27017/db_adcee";
mongoose.Promise = global.Promise;
const dburl = "mongodb+srv://malavemjv:guayoyo@adccedb.z6dz1.mongodb.net/db_adcee";



mongoose.connect(
  dburl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CONECTADO A LA BASE DE DATOS: DB_ADCCE"))
  .catch(err => console.log(err));



//DECLARACION EXPRESS
const app = express();

const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:4200',
  'http://localhost:3000',
  'http://tienda.adelonline.es',
  'http://admin.adelonline.es',
  'http://api.adelonline.es'
];

const corsOptions = {
  origin: function(origin, callback) {
    // Permite solicitudes sin origen (como Postman o curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());


app.use('/api/payment', paymentRoutes);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/', router);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => { 
  console.log("EL SERVIDOR SE EJECUTA PERFECTAMENTE EN EL PUERTO 3000");
});

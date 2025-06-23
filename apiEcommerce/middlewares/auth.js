import token from "../services/token"
import jwt from 'jsonwebtoken';




export default {
  verifyEcommerce: async(req, res, next) => {
    if(!req.headers.token){
      return res.status(404).send({
        message: "NO SE ENVIÓ EL TOKEN"
      });
    }
    const response = await token.decode(req.headers.token);
    if(response){
      console.log("RES",response);

      if(response.rol == "cliente" || response.rol == "admin"){
        req.user = response; // <--- Adjunta el usuario decodificado
        return next();
      }
      else{
        return res.status(403).send({
          message: "NO ESTA PERMITIDO VISITAR ESTA RUTA"
        });
      }
    }else{
      return res.status(403).send({
        message: "EL TOKEN NO ES VALIDO"
      });
    }
  },
  verifyAdmin: async(req, res, next) => {
    if(!req.headers.token){
      return res.status(404).send({
        message: "NO SE ENVIÓ EL TOKEN"
      });
    }
    const response = await token.decode(req.headers.token);
    if(response){
      if(response.rol == "admin" || response.rol == "emprendedor"){
        req.user = response; // <--- Adjunta el usuario decodificado
        return next();
      }
      else{
        return res.status(403).send({
          message: "NO ESTA PERMITIDO VISITAR ESTA RUTA"
        });
      }
    }else{
      return res.status(403).send({
        message: "EL TOKEN NO ES VALIDO"
      });
    }
  },
}

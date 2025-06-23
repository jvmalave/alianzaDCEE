import jwt from "jsonwebtoken"
import models  from "../models";


export default {
  encode: async(_id,rol,email) =>{
    const token = jwt.sign({_id:_id,rol: rol,email: email}, 'adcee', {expiresIn: '1d'});
    return token;
    

  },
  decode: async(token) =>{
    try {
      const {_id}= await jwt.verify(token, 'adcee');
      const user = await models.User.findOne({_id: _id,state: 1});
      
      if(user){
        return user;
      }
      return false;
    } catch (error) {
        console.log(error);
        return false;
    }
  }
}
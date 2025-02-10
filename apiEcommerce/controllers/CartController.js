import { response } from "express";
import models from "../models";
import resourse from "../resourses"

export default {
  list: async(req,res) => {
    try {
        let user_id = req.query.user_id;
        let CARTS = await models.Cart.find({
          user: user_id,
        }).populate("variedad").populate({
          path: "product",
          populate: {
             path: "categorie"
          },
        });
        
        CARTS = CARTS.map((cart) => {
          return resourse.Cart.cart_list(cart);
        });
      
        res.status(200).json({
          carts: CARTS
        })
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "OCURRIÓ UN ERROR"
      })
    }
  },
  register: async(req,res) => {
    try {
        let data = req.body;
        //1ro: validar si el producto existe en carrito de compras 
        if(data.variedad){
          let valid_cart = await models.Cart.findOne({
            user: data.user,
            variedad: data.variedad,
            product: data.product,
          });
          if (valid_cart){
            res.status(200).json({
              message: 403,
              message_tex: "EL PRODUCTO CON LA VARIEDAD YA EXISTE EN EL CARRITO DE COMPRA"
            })
            return;
          }
        }else{
          let valid_cart = await models.Cart.findOne({
            user: data.user,
            product: data.product,
        });
        if (valid_cart){
          res.status(200).json({
            message: 403,
            message_tex: "EL PRODUCTO YA EXISTE EN EL CARRITO DE COMPRA"
          })
          return;
        }
      }
      // 2do: validar si el stock esta disponible
        if(data.variedad){
          let valid_variedad = await models.Variedad.findOne({
            id_: data.variedad,
          });
          if(valid_variedad.stock < data.cantidad){
            res.status(200).json({
              message: 403,
              message_tex: "LA CANTIDAD SOLICITADA NO ESTA DISPONIBLE EN STOCK"
            })
            return;
          }
        }else{
          let valid_product = await models.Product.findOne({
            _id: data.product,
        });
        if(valid_product.stock < data.cantidad){
          res.status(200).json({
            message: 403,
            message_tex: "LA CANTIDAD SOLICITADA NO ESTA DISPONIBLE EN STOCK"
          })
          return;
        }
      }
        let CART = await models.Cart.create(data);

        res.status(200).json({
          cart: CART,
          message_tex: "El carrito de compra se registró satisfactoriamente",
        })
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "OCURRIÓ UN ERROR"
      })
    }
  },
  update: async(req,res) => {
    try {
      let data = req.body;
      // 2do: validar si el stock esta disponible
        if(data.variedad){
          let valid_variedad = await models.Variedad.findOne({
            id_: data.variedad,
          });
          if(valid_variedad.stock < data.cantidad){
            res.status(200).json({
              message: 403,
              message_tex: "LA CANTIDAD SOLICITADA NO ESTA DISPONIBLE EN STOCK"
            })
            return;
          }
        }else{
          let valid_product = await models.Product.findOne({
            _id: data.product,
        });
        if(valid_product.stock < data.cantidad){
          res.status(200).json({
            message: 403,
            message_tex: "LA CANTIDAD SOLICITADA NO ESTA DISPONIBLE EN STOCK"
          })
          return;
        }
      }
        let CART = await models.Cart.findByIdAndUpdate({_id:data._id},data);

        res.status(200).json({
          cart: CART,
          message_tex: "El carrito de compra se actualizó satisfactoriamente",
        })
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "OCURRIÓ UN ERROR"
      })
    }
  },
  delete: async(req,res) => {
    try {
      let _id = req.params.id;
      let CART = await models.Cart.findByIdAndDelete({_id:_id});

      res.status(200).json({
        message_text: "El carrito de compra se eliminó satisfactoriamente"
      })


    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "OCURRIÓ UN ERROR"
      })
    }
  }
}

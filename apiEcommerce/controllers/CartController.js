
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
          carts: CARTS,
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
              message_text: "EL PRODUCTO CON LA VARIEDAD SELECCIONADA YA EXISTE EN EL CARRITO DE COMPRA"
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
            message_text: "EL PRODUCTO YA EXISTE EN EL CARRITO DE COMPRA"
          })
          return;
        }
      }
      // 2do: validar si el stock esta disponible
        if(data.variedad){
          let valid_variedad = await models.Variedad.findOne({
            _id: data.variedad,
          });
          if(valid_variedad.stock < data.cantidad){
            res.status(200).json({
              message: 403,
              message_text: "Upss! La cantidad solicitada no esta disponible en stock, Por favor ingrese una cantidad menor o igual a "+ valid_variedad.stock
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
            message_text: "Upss! La cantidad solicitada no esta disponible en stock, Por favor ingrese una cantidad menor o igual a "+ valid_product.stock
          })
          return;
        }
      }
        let CART = await models.Cart.create(data);

        let   NEW_CART = await models.Cart.findById({_id:CART._id}).populate("variedad").populate({
          path: "product",
          populate: {
             path: "categorie"
          },
        });

        res.status(200).json({
          cart: resourse.Cart.cart_list(NEW_CART),
          message_text: "El carrito de compra se registró satisfactoriamente",
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
            _id: data.variedad,
          });
          if(valid_variedad.stock < data.cantidad){
            res.status(200).json({
              message: 403,
              message_tex: "Upss! La cantidad solicitada no esta disponible en stock, Por favor ingrese una cantidad menor o igual a "+ valid_variedad.stock
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
            message_text: "Upss! La cantidad solicitada no esta disponible en stock, Por favor ingrese una cantidad menor o igual a "+ valid_product.stock
          })
          return;
        }
      }
        let CART = await models.Cart.findByIdAndUpdate({_id:data._id},data);

        let   NEW_CART = await models.Cart.findById({_id:CART._id}).populate("variedad").populate({
          path: "product",
          populate: {
             path: "categorie"
          },
        });

        res.status(200).json({
          cart: resourse.Cart.cart_list(NEW_CART),
          message_text: "El carrito de compra se actualizó satisfactoriamente",
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
  },

  applyCupon: async(req,res) => {
    try {
      let data = req.body;
      //1ra Validacion es con la existencia del cupon
      let CUPON = await models.Cupone.findOne({
        code: data.code,
      })
      if(!CUPON){
        res.status(200).json({
          message: 403,
          message_text: "Upss! El cupon ingresado no existe, por favor ingrese otro nuevamente"
        })
        return;
      }

      //2da validacion tiene que ver con el uso de cupon -- Espera

      // Parte operativa

      let carts = await models.Cart.find({user: data.user_id}).populate("product")


      let products = [];
      let categories = [];

      CUPON.products.forEach(product => {
        products.push(product._id);
      });

      // Se presenta bajo el formato[8282020009, 7337733934] y no [(_id: 8282020009), (_id:7337733934)]

      CUPON.categories.forEach(categorie => {
        categories.push(categorie._id);
      });

      for (const cart of carts) {
        if(products.length > 0){
          if(products.includes(cart.product._id+"")){
            let subtotal = 0;
            let total = 0;
            if(CUPON.type_discount == 1){//porcentaje
              subtotal = cart.price_unit - cart.price_unit *(CUPON.discount*0.01);
            }else{//porcentaje
              subtotal = cart.price_unit - CUPON.discount;
            }
            total = subtotal * cart.cantidad;
            await models.Cart.findByIdAndUpdate({_id: cart._id},{
              subtotal: subtotal,
              total: total,
              type_discount: CUPON.type_discount,
              discount: CUPON.discount,
              code_cupon: CUPON.code,
            });
          }
         }
         if(categories.length > 0){
          if(categories.includes(cart.product.categorie+"")){
            let subtotal = 0;
            let total = 0;
            if(CUPON.type_discount == 1){//porcentaje
              subtotal = cart.price_unit - cart.price_unit *(CUPON.discount*0.01);
            }else{//porcentaje
              subtotal = cart.price_unit - CUPON.discount;
            }
            total = subtotal * cart.cantidad;
            await models.Cart.findByIdAndUpdate({_id: cart._id},{
              subtotal: subtotal,
              total: total,
              type_discount: CUPON.type_discount,
              discount: CUPON.discount,
              code_cupon: CUPON.code,
            });
          }

        }
      }
      res.status(200).json({
        message: 200,
        message_text: "Super! El cupon fue aplicado exitosamente"
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "OCURRIÓ UN ERROR"
      })
    }
  },
}

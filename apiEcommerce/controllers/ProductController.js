import models from '../models'
import resourses from '../resourses';
import fs from 'fs'
import path from 'path'

export default{
  register: async(req,res) => {
    try {
      let data = req.body;
    
      let valid_Product = await models.Product.findOne({title:data.title});
      if(valid_Product){
        res.status(200).json({
          code:403,
          message: "EL PRODUCTO YA EXISTE"
        });
        return;
      }
      data.slug = data.title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

      if(req.files){
        var img_path = req.files.imagen.path;
        var name = img_path.split('/');
        var portada_name = name[2];
        //console.log(portada_name)
        data.portada = portada_name;
      }

      let product = await models.Product.create(data);

      res.status(200).json({
        message: "EL PRODUCTO SE REGISTRO SATISFACTORIAMENTE"
      });

    } catch (error) {
      res.status(500).send({
        message: "OCURRIO UN PROBLEMA"
      });
    }
  },

  update: async(req,res) =>{
    try {
      let data = req.body;
      
      let valid_product = await models.Product.findOne({title:data.title, _id:{$ne: data._id}});

      if(valid_product){
        res.status(200).json({
          code:403,
          message: "EL PRODUCTO YA EXISTE"
        });
        return;
      }
      data.slug = data.title.tolowerCase().replace(/ /g,"-").replace(/[^\w-]+/g,'');

      if(req.files && files.imagen){
        var img_path = req.files.imagen.path;
        var name = img_path.split('/');
        var portada_name = name[2];
        //console.log(portada_name)
        req.data.portada = portada_name;
      }

     await models.Product.findByIdAndUpdate({_id:data._id}, data);

      res.status(200).json({
        message: "EL PRODUCTO SE ACTUALIZO SATISFACTORIAMENTE"
      });

    } catch (error) {
      res.status(500).send({
        message: "OCURRIO UN PROBLEMA"
      });
    }

  },

  list: async(req,res) =>{
    try {
      var search = req.query.search;
      var categorie = req.query.categorie;
      var condition = req.query.condition;

      let products = await models.Product.find({
        $or:[
          {"title": RegExp(search, "i")},
          {"categorie": categorie},
          {"condition": condition},
        ]
      }).populate("categorie")

      products = products.map(product => {
        return resourses.Product.product_list(product);
      })
      res.status(200).json({
        products: products,
      })
    } catch (error) {
      res.status(500).send({
        message: "OCURRIO UN PROBLEMA"
      });
    }



  },

  remove: async(req,res) =>{
    try {
      let _id = req.params._id;
      await models.Product.findByIdAndDelete({_id:_id});

      res.status(200).json({
        massage: "EL PRODUCTO SE ELIMINÓ SATISFACTORIAMENTE"
      });

      
    } catch (error) {
      res.status(500).send({
        message: "OCURRIO UN PROBLEMA"
      });
    }

  },

  obtener_imagen: async(req,res) =>{
    try {
            var img = req.params['img'];
            fs.stat('./uploads/product/'+ img, function(err){
                if(!err){
                    let path_img = './uploads/product/'+img;
                    res.status(200).sendFile(path.resolve(path_img));
                }else{
                    let path_img = './uploads/default.jpg';
                    res.status(200).sendFile(path.resolve(path_img));
                }
            })
        }catch (error) {
          res.status(500).send({
            message: "OCURRIÓ UN PROBLEMA"
          });
        }
  },

  show: async(req,res) => {
    try {
      var product_id = req.params.id;
      let PRODUCT = await models.Product.findById({_id: product_id});

      res.status(200).json({
        product: resourses.Product.product_list(PRODUCT),
      })
      
    } catch (error) {
      res.status(500).send({
        message: "OCURRIÓ UN PROBLEMA"
      });
      console.log(error);
    }

  },

  register_imagen: async(req,res) =>{
    try {
        var img_path = req.files.imagen.path;
        var name = img_path.split('/');
        var imagen_name = name[2];

        let product = await models.Product.findByIdAndUpdate({_id: req.body._id}, {
          $push: {
            galerias:{
              imagen: imagen_name,
              _id: req.body.__id,
            }
          }
        })

        res.status(200).json({
          message: "LA IMAGEN SE SUBIO CORRECTAMENTE",
          imagen: {
            imagen: imagen_name,
            imagen_path: "http://localhost:3000"+"/uploads/product/"+imagen_name,
              _id: req.body.__id,
          }
        })
      
    } catch (error) {
      res.status(500).send({
        message: "OCURRIÓ UN PROBLEMA"
      });
    }

  },

  remove_imagen:async(req,res) =>{
    try {
       await models.Product.findByIdAndUpdate({_id: req.body._id}, {
          $pull: {
            galerias:{
              _id: req.body.__id,
            }
          }
        })     
        res.status(200).json({
          message: "LA IMAGEN SE ELIMINÓ CORRECTAMENTE",
        })
      
    } catch (error) {
      res.status(500).send({
        message: "OCURRIÓ UN PROBLEMA"
      });
      
    }

  },



}
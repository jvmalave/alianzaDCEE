import bcrypt from "bcryptjs"
import models from "../models";
import token from "../services/token";
import resourses from "../resourses";


export default{
  
  register: async(req,res) => {
    try {
      const userC = await models.User.findOne({email: req.body.email});
      if(userC){
        res.status(500).send({
          message: "EL USUARIO YA EXISTE"
        });
      }
      req.body.rol = "cliente"
      req.body.password = await bcrypt.hash(req.body.password,10);
      const user = await models.User.create(req.body);
      res.status(200).json(user);
      
    } catch (error) {
        res.status(500).send({
          message: "OCURRIÓ UN PROBLEMA"
        });
        console.log(error);
    }
  },
  register_seller: async(req,res) => {
    try {
      const userC = await models.User.findOne({email: req.body.email});
      if(userC){
        res.status(500).send({
          message: "EL USUARIO YA EXISTE"
        });
      }
      req.body.rol = "emprendedor"
      req.body.password = await bcrypt.hash(req.body.password,10);
      const user = await models.User.create(req.body);
      res.status(200).json(user);
      
    } catch (error) {
        res.status(500).send({
          message: "OCURRIÓ UN PROBLEMA"
        });
        console.log(error);
    }
  }, 
  register_admin: async(req,res) => {
    try {
      const userV = await models.User.findOne({email: req.body.email});
      if(userV){
        res.status(500).send({
          message: "EL USUARIO YA EXISTE"
        });
      }
      req.body.rol = "admin"
      req.body.password = await bcrypt.hash(req.body.password,10);
      let user = await models.User.create(req.body);
      res.status(200).json({
        user: resourses.User.user_list(user)
      });
      
    } catch (error) {
        res.status(500).send({
          message: "OCURRIÓ UN PROBLEMA"
        });
        console.log(error);
    }
  },
  login: async(req,res) => {
    try {
        const user = await models.User.findOne({email: req.body.email,state:1});
        if(user){
            //SI ESTA REGISTRADO EN EL SISTEMA
            let compare = await bcrypt.compare(req.body.password,user.password);
            if(compare){
                let tokenT = await token.encode(user._id,user.rol,user.email);

                const USER_FRONTED = {
                    token:tokenT,
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        surname: user.surname,
                        avatar: user.avatar,
                    },
                }

                res.status(200).json({
                    USER_FRONTED:USER_FRONTED,
                })
            }else{
                res.status(500).send({
                    message: "EL USUARIO NO EXISTE"
                });
            }
        }else{
            res.status(500).send({
                message: "EL USUARIO NO EXISTE"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "OCURRIO UN PROBLEMA"
        });
        console.log(error);
    }
  },
  login_admin: async(req,res) => {
  try {
      const user = await models.User.findOne({email: req.body.email,state:1});
      if(user){
          //SI ESTA REGISTRADO EN EL SISTEMA
          let compare = await bcrypt.compare(req.body.password,user.password);
          if(compare){
              let tokenT = await token.encode(user._id,user.rol,user.email);

              const USER_FRONTED = {
                  token:tokenT,
                  user: {
                      _id: user._id,
                      name: user.name,
                      email: user.email,
                      surname: user.surname,
                      avatar: user.avatar,
                      rol: user.rol
                  },
              }

              res.status(200).json({
                  USER_FRONTED:USER_FRONTED,
              })
          }else{
              res.status(500).send({
                  message: "EL USUARIO NO EXISTE"
              });
          }
      }else{
          res.status(500).send({
              message: "EL USUARIO NO EXISTE"
          });
      }
  } catch (error) {
      res.status(500).send({
          message: "OCURRIO UN PROBLEMA"
      });
      console.log(error);
  }
  },
  login_seller: async(req,res) => {
  try {
      const user = await models.User.findOne({email: req.body.email,state:1,rol:"emprendedor"});
      if(user){
          //SI ESTA REGISTRADO EN EL SISTEMA
          let compare = await bcrypt.compare(req.body.password,user.password);
          if(compare){
              let tokenT = await token.encode(user._id,user.rol,user.email);

              const USER_FRONTED = {
                  token:tokenT,
                  user: {
                      _id: user._id,
                      name: user.name,
                      email: user.email,
                      surname: user.surname,
                      avatar: user.avatar,
                      rol: user.rol
                  },
              }

              res.status(200).json({
                  USER_FRONTED:USER_FRONTED,
              })
          }else{
              res.status(500).send({
                  message: "EL USUARIO NO EXISTE"
              });
          }
      }else{
          res.status(500).send({
              message: "EL USUARIO NO EXISTE"
          });
      }
  } catch (error) {
      res.status(500).send({
          message: "OCURRIO UN PROBLEMA"
      });
      console.log(error);
  }
  },
  update: async(req,res) => {
    try {
       if(req.files){
         var img_path = req.files.avatar.path;
         var name = img_path.split('/');
         var avatar_name = name[2];
         console.log(avatar_name)
       }
      
      if(req.body.password){
        req.body.password = await bcrypt.hash(req.body.password,10);
      }
     await models.User.findByIdAndUpdate({_id: req.body._id},req.body);

     let UserT = await models.User.findOne({_id: req.body._id});

      res.status(200).json({
        message: "EL USUARIO SE HA MODIFICADO CORRECTAMENTE",
        user: resourses.User.user_list(UserT),
      })
    } catch (error) {
      res.status(500).send({
        message: "OCURRIÓ UN PROBLEMA"
      });
      console.log(error);
    }

  },
  // list: async(req,res) => {
  //   try {
  //     var search = req.query.search;
  //     let Users  = await models.User.find({
  //       $or:[
  //         {"name": new RegExp(search, "i")},
  //         {"surname": new RegExp(search, "i")},
  //         {"email": new RegExp(search, "i")},
  //       ]
  //   }).sort({'createdAt':-1});

  //   Users = Users.map((user) => {
  //     return resourses.User.user_list(user);
  //   })

  //   res.status(200).json({
  //     users: Users
  //   });
  //   } catch (error) {
  //     res.status(500).send({
  //       message: "OCURRIÓ UN PROBLEMA"
  //     });
  //     console.log(error);
      
  //   }
  // },

// Listar usuarios según el rol
  list: async (req, res) => {
    try {
      const search = req.query.search || '';
      const regex = new RegExp(search, "i");

      // El rol y el id del usuario autenticado
      const { rol, _id } = req.user;

      let users = [];
      if (rol === "admin") {
        // Admin: todos los usuarios
        users = await models.User.find({
          $or: [
            { name: regex },
            { surname: regex },
            { email: regex }
          ]
        });
      } else if (rol === "emprendedor") {
        // Emprendedor: solo su propio usuario
        users = await models.User.find({
          _id: _id,
          $or: [
            { name: regex },
            { surname: regex },
            { email: regex }
          ]
        });
      } else {
        return res.status(403).json({ message: "No autorizado" });
      }

      res.status(200).json({ users });

    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuarios" });
    }
  },
  remove: async(req, res) => {
    try {
      const User = await models.User.findByIdAndDelete({_id: req.query._id});
      res.status(200).json({
        message: "EL USUARIO SE ELIMINO CORRECTAMENTE",
      });
    } catch (error) {
      res.status(500).send({
        message: "OCURRIÓ UN PROBLEMA"
      });
      console.log(error);
    }
  },
  getById: async (req, res) => {
    try {
      const user = await models.User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
      console.log("USER", user);
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuario" });
    }
  }
}
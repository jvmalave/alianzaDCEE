import models from "../models"

export default {
  
  register: async (req, res) => {
    try {
      const { rol, _id } = req.user;
      const {
        code,
        type_discount,
        discount,
        type_count,
        num_use,
        type_segment,
        products = [],
        categories = []
      } = req.body;

      // Validación básica de campos obligatorios
      if (!code || !type_discount || !discount || !type_count || !type_segment) {
        return res.status(400).json({ message: 400, message_text: "Faltan campos obligatorios" });
      }
      if (type_count == 2 && (!num_use || num_use < 1)) {
        return res.status(400).json({ message: 400, message_text: "Debes indicar el número de usos" });
      }
      if (type_segment == 1 && (!products || products.length === 0)) {
        return res.status(400).json({ message: 400, message_text: "Debes seleccionar al menos un producto" });
      }
      if (type_segment == 2 && (!categories || categories.length === 0)) {
        return res.status(400).json({ message: 400, message_text: "Debes seleccionar al menos una categoría" });
      }

      // Validación de permisos para emprendedor
      if (rol === "emprendedor") {
        // Validar productos
        if (type_segment == 1 && products.length > 0) {
          const myProducts = await models.Product.find({ seller_id: _id });
          const myProductIds = myProducts.map(p => p._id.toString());
          const invalid = products.some(p => !myProductIds.includes(p._id));
          if (invalid) {
            return res.status(403).json({ message: 403, message_text: "No puedes crear cupones para productos que no son tuyos" });
          }
        }
        // Validar categorías
        if (type_segment == 2 && categories.length > 0) {
          const myProducts = await models.Product.find({ seller_id: _id });
          const myCategoryIds = [...new Set(myProducts.map(p => p.categorie.toString()))];
          const invalid = categories.some(c => !myCategoryIds.includes(c._id));
          if (invalid) {
            return res.status(403).json({ message: 403, message_text: "No puedes crear cupones para categorías donde no tienes productos" });
          }
        }
      }

      // Crear el cupón
      const newCupone = new models.Cupone({
        code,
        type_discount,
        discount,
        type_count,
        num_use: type_count == 2 ? num_use : null,
        type_segment,
        products: products.map(p => p._id),
        categories: categories.map(c => c._id),
        creator: _id, // puedes guardar quién creó el cupón si lo deseas
      });

      await newCupone.save();

      return res.status(200).json({ message: 200, message_text: "Cupón creado correctamente" });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 500, message_text: "Error al registrar cupón" });
    }
  },
  update: async(req,res) => {
      try {
          let data = req.body;

          let exits_cupone = await models.Cupone.findOne({code: data.code,_id: {$ne: data._id}});

          if(exits_cupone){
              res.status(200).json({
                  message:403,
                  message_text: "EL CODIGO DEL CUPON YA EXISTE"
              });
              return;
          }

          let cupone = await models.Cupone.findByIdAndUpdate({_id: data._id},data);
          
          let cuponeT = await models.Cupone.findById({_id: data._id});

          res.status(200).json({
              message: 200,
              message_text: "El cupón se actualizó satisfactoriamente",
              cupone:cuponeT,
          });

      } catch (error) {
          res.status(500).send({
              message: "OCURRIO UN ERROR",
          });
      }
  },
  delete: async(req,res) => {
      try {
          let _id = req.query._id;

          await models.Cupone.findByIdAndDelete({_id: _id});

          res.status(200).json({
              message: 200,
              message_text: "El cupón se eliminó satisfactoriamente",
          });

      } catch (error) {
          res.status(500).send({
              message: "OCURRIO UN ERROR",
          });
      }
  },
  
  list: async (req, res) => {
    try {
      const search = req.query.search || '';
      const regex = new RegExp(search, "i");
      const { rol, _id } = req.user;

      let filter = {
        code: { $regex: regex }
      };

      if (rol === "emprendedor") {
        // Solo los cupones creados por el emprendedor
        filter.creator = _id;
      }
      // Admin ve todos los cupones

      const cupones = await models.Cupone.find(filter).sort({ createdAt: -1 });
      res.status(200).json({ cupones });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener cupones" });
    }
  },
  show: async(req,res) => {
      try {
          let cupone_id = req.query.cupone_id;

          let cupon = await models.Cupone.findOne({_id: cupone_id});

          res.status(200).json({
              message: 200,
              cupon: cupon,
          });

      } catch (error) {
          res.status(500).send({
              message: "OCURRIO UN ERROR",
          });
      }
  },
  config: async (req, res) => {
    try {
      const { rol, _id } = req.user;
      let categories, products;

      if (rol === "admin") {
        categories = await models.Categorie.find();
        products = await models.Product.find();
      } else if (rol === "emprendedor") {
        // Solo productos del emprendedor
        products = await models.Product.find({ seller_id: _id });
        // Solo categorías donde tiene productos
        const categoryIds = [...new Set(products.map(p => p.categorie.toString()))];
        categories = await models.Categorie.find({ _id: { $in: categoryIds } });
      } else {
        return res.status(403).json({ message: "No autorizado" });
      }

      res.status(200).json({ categories, products });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener configuración de cupones" });
    }
  },
}
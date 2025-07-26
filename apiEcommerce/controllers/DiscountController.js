import models from "../models"

export default {
  
  register: async (req, res) => {
  try {
    let data = req.body;
    const { rol, _id } = req.user;

    // Validación de permisos para emprendedor
    if (rol === "emprendedor") {
      // Validar productos
      if (data.type_segment == 1 && data.product_s && data.product_s.length > 0) {
        const myProducts = await models.Product.find({ seller_id: _id });
        const myProductIds = myProducts.map(p => p._id.toString());
        const invalid = data.product_s.some(p => !myProductIds.includes(p));
        if (invalid) {
          return res.status(403).json({
            message: 403,
            message_text: "No puedes crear descuentos para productos que no son tuyos"
          });
        }
      }
      // Validar categorías
      if (data.type_segment == 2 && data.categorie_s && data.categorie_s.length > 0) {
        const myProducts = await models.Product.find({ seller_id: _id });
        const myCategoryIds = [...new Set(myProducts.map(p => p.categorie.toString()))];
        const invalid = data.categorie_s.some(c => !myCategoryIds.includes(c));
        if (invalid) {
          return res.status(403).json({
            message: 403,
            message_text: "No puedes crear descuentos para categorías donde no tienes productos"
          });
        }
      }
    }

    // Lógica de solapamiento de descuentos
    var filter_a = [];
    var filter_b = [];

    if (data.type_segment == 1) {
      filter_a.push({
        "products": { $elemMatch: { _id: { $in: data.product_s } } }
      });
      filter_b.push({
        "products": { $elemMatch: { _id: { $in: data.product_s } } }
      });
    } else {
      filter_a.push({
        "categories": { $elemMatch: { _id: { $in: data.categorie_s } } }
      });
      filter_b.push({
        "categories": { $elemMatch: { _id: { $in: data.categorie_s } } }
      });
    }

    filter_a.push({
      type_campaign: data.type_campaign,
      start_date_num: { $gte: data.start_date_num, $lte: data.end_date_num }
    });

    filter_b.push({
      type_campaign: data.type_campaign,
      end_date_num: { $gte: data.start_date_num, $lte: data.end_date_num }
    });

    let exits_start_date = await models.Discount.find({ $and: filter_a });
    let exits_end_date = await models.Discount.find({ $and: filter_b });

    if (exits_start_date.length > 0 || exits_end_date.length > 0) {
      return res.status(200).json({
        message: 403,
        message_text: "EL DESCUENTO NO SE PUEDE PROGRAMAR, ALGUNA OPCIÓN SELECCIONADA TIENE UN DESCUENTO ACTIVO"
      });
    }

    // Guardar el creador del descuento
    data.creator = _id;

    let discount = await models.Discount.create(data);

    res.status(200).json({
      message: 200,
      message_text: "El descuento se registró satisfactoriamente",
      discount: discount
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "OCURRIO UN ERROR",
    });
  }
  },
  update: async(req,res) => {
    try {
      let data = req.body;
      var filter_a = [];
      var filter_b = [];

      if(data.type_segment == 1){
        filter_a.push({
          "products": {$elemMatch: {_id: {$in:data.product_s}}}
        });
        filter_b.push({
          "products": {$elemMatch: {_id: {$in:data.product_s}}}
        });
      }else{
        filter_a.push({
          "categories": {$elemMatch: {_id: {$in:data.categorie_s}}}
        });
        filter_b.push({
          "categories": {$elemMatch: {_id: {$in:data.categorie_s}}}
        });
      };

      filter_a.push({
        type_campaign: data.type_campaign,
        _id: {$ne: data._id},
        start_date_num: {$gte: data.start_date_num, $lte: data.end_date_num}
      })

      filter_b.push({
        type_campaign: data.type_campaign,
        _id: {$ne: data._id},
        end_date_num: {$gte: data.start_date_num, $lte: data.end_date_num}
      })

      let exits_start_date = await models.Discount.find({$and: filter_a});

      let exits_end_date = await models.Discount.find({$and: filter_b});

      if( exits_start_date.length > 0 || exits_end_date.length > 0 ){
          res.status(200).json({
              message:403,
              message_text: "EL DESCUENTO NO SE PUEDE PROGRAMAR, ALGUNA OPCIÓN TIENE UN DESCUENTO ACTIVO"
          });
          return;
      }

      let discount = await models.Discount.findByIdAndUpdate({_id: data._id},data);

      res.status(200).json({
          message: 200,
          message_text: "El descuento se actualizó satisfactoriamente",
          discount:discount
      });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "OCURRIO UN ERROR",
        });
    }
  },
  delete: async(req,res) => {
    try {
        let _id = req.query._id;

        await models.Discount.findByIdAndDelete({_id: _id});

        res.status(200).json({
            message: 200,
            message_text: "El descuento se eliminó satisfactoriamente",
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
      // Puedes agregar filtros por código, nombre, etc. si tienes campos para búsqueda
      // Aquí un ejemplo si tienes campo 'code' o 'name' en el descuento
      // code: { $regex: regex }
    };

    if (rol === "emprendedor") {
      // Solo descuentos creados por el emprendedor
      filter.creator = _id;
    }
    // Admin ve todos los descuentos, sin filtro por creator

    const discounts = await models.Discount.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ discounts });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener descuentos" });
  }
  },
  show: async(req,res) => {
    try {
        let discount_id = req.query.discount_id;

        let discount = await models.Discount.findOne({_id: discount_id});

        res.status(200).json({
            message: 200,
            discount: discount,
        });

    } catch (error) {
        console.log(error);
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
        products = await models.Product.find({ seller_id: _id });
        const categoryIds = [...new Set(products.map(p => p.categorie.toString()))];
        categories = await models.Categorie.find({ _id: { $in: categoryIds } });
      } else {
        return res.status(403).json({ message: "No autorizado" });
      }

      res.status(200).json({ 
        message: 200,
        categories: categories,
        products: products });

    } catch (error) {
      res.status(500).json({ message: "Error al obtener configuración de descuentos" });
    }
  },
}
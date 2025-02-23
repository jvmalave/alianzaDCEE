import models from "../models";
import resourse from "../resourses";
import bcrypt from "bcryptjs"



export default {

  list: async(req, res) => {

    try {

        var TIME_NOW = req.query.TIME_NOW

        let Sliders = await models.Slider.find({state:1}); 

        Sliders = Sliders.map((slider) => {
              return resourse.Slider.slider_list(slider);
            })

        let Categories = await models.Categorie.find({state:1}); 

        Categories = Categories.map((categorie) => {
          return resourse.Categorie.categorie_list(categorie);
        })

        let BestProducts = await models.Product.find({ state:2, condition: {$ne: 3}}).sort({ "createdAt": -1});

        var ObjectBestProducts = [];
        for (const Product of BestProducts){
          let VARIEDADES = await models.Variedad.find({product: Product._id});
          ObjectBestProducts.push(resourse.Product.product_list(Product, VARIEDADES));
        }

        let OursProducts = await models.Product.find({ state:2, condition: {$ne: 3}}).sort({ "createdAt": 1});

        var ObjectOursProducts = [];
        for (const Product of OursProducts) {
            let VARIEDADES = await models.Variedad.find({product: Product._id});
            ObjectOursProducts.push(resourse.Product.product_list(Product,VARIEDADES));
        }

        // OursProducts = OursProducts.map(async (product) => {
        //   let VARIEDADES = await models.Variedad.find({product: product._id});
        //   return resourse.Product.product_list(product,VARIEDADES);
        // })

        let DonationProducts = await models.Product.find({ state:2, condition:3}).sort({ "createdAt": 1});

        var ObjectDonationProducts = [];
        for (const Product of DonationProducts) {
            let VARIEDADES = await models.Variedad.find({product: Product._id});
            ObjectDonationProducts.push(resourse.Product.product_list(Product,VARIEDADES));
        }

        // DonationProducts = DonationProducts.map((product) => {
        //   return resourse.Product.product_list(product);
        // })

        let FlashSale =  await models.Discount.findOne({
          type_campaign: 2,
          start_date_num:{$lte: TIME_NOW},
          end_date_num:{$gte: TIME_NOW},
        });

        let ProductList = [];
        if(FlashSale){
          for (const product of FlashSale.products) {
            var ObjecT = await models.Product.findById({_id:product._id});
            let VARIEDADES = await models.Variedad.find({product: product._id});
            ProductList.push(resourse.Product.product_list(ObjecT,VARIEDADES));
          }
        }
  
          //console.log(FlashSale);
          // console.log(TIME_NOW);
        
        res.status(200).json({
          sliders: Sliders,
          categories: Categories,
          best_products:ObjectBestProducts,
          our_products: ObjectOursProducts,
          donation_products:ObjectDonationProducts,
          FlashSale:FlashSale,
          campaign_products:ProductList,
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "OCURRIÓ UN PROBLEMA"
      });
    }
  },
  show_landing_product: async(req, res) =>{
    try {
      let SLUG = req.params.slug;

      let Product = await models.Product.findOne({slug: SLUG, state: 2});

      let VARIEDADES =  await models.Variedad.find({product: Product._id});

      let RelatedProducts = await models.Product.find({categorie: Product.categorie, state: 2 });

      var ObjectRelatedProducts = [];
        for (const Product of RelatedProducts) {
            let VARIEDADES = await models.Variedad.find({product: Product._id});
            ObjectRelatedProducts.push(resourse.Product.product_list(Product,VARIEDADES));
        }

      res.status(200).json({
        product: resourse.Product.product_list(Product, VARIEDADES),
        related_products: ObjectRelatedProducts,

        })
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "OCURRIÓ UN PROBLEMA"
      });
    }

  },
  profile_client: async(req, res) =>{
    try {
      let user_id = req.body.user_id;

      let Orders =  await models.Sale.find({user: user_id});

      let sale_orders = [];

      for (const order of Orders) {
        let detail_orders = await models.SaleDetail.find({sale: order._id}).populate({
          path: "product",
          populate: {
             path: "categorie"
          },
        }).populate("variedad");
        let sale_address = await models.SaleAddress.find({sale: order._id});
        let collection_detail_orders = [];
        for (const detail_order of detail_orders) {
          let reviewS = await models.Review.findOne({sale_detail: detail_order._id});
          collection_detail_orders.push({
              _id:detail_order._id,
              product:{
                _id: detail_order.product._id,
                title: detail_order.product.title,
                imagen:"http://localhost:3000"+"/api/products/uploads/product/"+detail_order.product.portada, 
                state: detail_order.product.state,
                slug: detail_order.product.slug,
                sku: detail_order.product.sku,
                categorie: detail_order.product.categorie,
                price_bs: detail_order.product.price_bs,
                price_usd: detail_order.product.price_usd,
                condition: detail_order.product.condition,
              },
              type_discount: detail_order.type_discount,
              discount: detail_order.discount,
              cantidad: detail_order.cantidad,
              variedad: detail_order.variedad,
              code_cupon: detail_order.code_cupon,
              code_discount: detail_order.code_discount,
              price_unit: detail_order.price_unit,
              subtotal: detail_order.subtotal,
              total: detail_order.total,
              review: reviewS,
          })
        }
        sale_orders.push({
          sale: order,
          sale_details:collection_detail_orders,
          sale_address: sale_address,
        })
      }
      let ADDRESS_CLIENT  = await models.AddressClient.find({user:user_id}).sort({'createdAt':-1});
      res.status(200).json({
        sale_orders: sale_orders,
        address_client: ADDRESS_CLIENT
      })

      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "OCURRIÓ UN PROBLEMA",
      });
      
    }
  },
   update_client: async (req, res) => {
     try {
       if (req.files) {
         var img_path = req.files.avatar.path;
         var name = img_path.split('/');
         var avatar_name = name[2];
         console.log(avatar_name)
       }

      //  console.log(req.body);
  
       const updateData = {};
  
       // Verifica cada campo y solo actualiza si tiene valor
       if (req.body.name) updateData.name = req.body.name;
       if (req.body.surname) updateData.surname = req.body.surname;
       if (req.body.email) updateData.email = req.body.email;
  
       // Solo actualiza el password si se proporciona uno nuevo
       if (req.body.password && req.body.password !== "") {
         updateData.password = await bcrypt.hash(req.body.password, 10);
       }
  
       await models.User.findByIdAndUpdate({ _id: req.body._id }, updateData);
  
       let User = await models.User.findOne({ _id: req.body._id });
  
       res.status(200).json({
         message: "Super! Su información se actualizó satisfactoriamente",
         user: {
           name: User.name,
           surname: User.surname,
           email: User.email,
           _id: User._id,
         }
       })
  
     } catch (error) {
       console.log(error);
       res.status(500).send({
         message: "OCURRIÓ UN PROBLEMA"
       });
     }
   },

}
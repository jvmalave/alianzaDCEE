import models from "../models";
import resourse from "../resourses";



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

  }
}
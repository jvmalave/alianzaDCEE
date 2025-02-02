import models from "../models";
import resourse from "../resourses";



export default {

  list: async(req, res) => {

    try {
        let Sliders = await models.Slider.find({state:1}); 

        Sliders = Sliders.map((slider) => {
              return resourse.Slider.slider_list(slider);
            })

        let Categories = await models.Categorie.find({state:1}); 

        Categories = Categories.map((categorie) => {
          return resourse.Categorie.categorie_list(categorie);
        })

        let BestProducts = await models.Product.find({ state:2, condition: {$ne: 3}}).sort({ "createdAt": -1});

        BestProducts = BestProducts.map((product) => {
          return resourse.Product.product_list(product);
        })

        let OursProducts = await models.Product.find({ state:2, condition: {$ne: 3}}).sort({ "createdAt": 1});

        OursProducts = OursProducts.map((product) => {
          return resourse.Product.product_list(product);
        })

        let DonationProducts = await models.Product.find({ state:2, condition:3}).sort({ "createdAt": 1});

        DonationProducts = DonationProducts.map((product) => {
          return resourse.Product.product_list(product);
        })


        
        res.status(200).json({
          sliders: Sliders,
          categories: Categories,
          best_products:BestProducts,
          our_products: OursProducts,
          donation_products:DonationProducts,
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "OCURRIÓ UN PROBLEMA"
      });
    }
  },
}
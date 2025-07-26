import models from "../models";

export default{
  register: async(req,res) => {
    try {
      //console.log(req.body);

      let review = await models.Review.create(req.body);

      res.status(200).json({
        message: "Super! La reseña se registró satisfactoriamente",
        review: review
      });
    } catch (error) {
      console.log(error);
        res.status(500).send({
          message: "OCURRIÓ UN PROBLEMA"
        });
    }

  },
  update: async(req,res) => {
    try {
      await models.Review.findByIdAndUpdate({_id: req.body._id},req.body);

      let reviewD = await models.Review.findById({_id: req.body._id})

      res.status(200).json({
        message: "Super! La reseña se actualizó satisfactoriamente",
        review: reviewD
      });

      
    } catch (error) {
      console.log(error);
        res.status(500).send({
          message: "OCURRIÓ UN PROBLEMA"
        });
    }
  },
}
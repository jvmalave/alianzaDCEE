import models from "../models";


export default {

  register: async (req,res) => {
    try {

      const address_client = await models.AddressClient.create(req.body);
            res.status(200).json({
              message: "Super! La dirección se registró satisfactoriamente",
              address_client: address_client
            });
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "OCURRIÓ UN PROBLEMA, en el register de AdressClientController"
      });

    }
  },

  update: async (req,res) => {
    try {
      let data = req.body;
      await models.AddressClient.findByIdAndUpdate({_id: req.body._id}, data);

      let AddressClient = await models.AddressClient.findById({_id: req.body._id});
      res.status(200).json({
        message: "Super! La dirección del cliente se actualizó satisfactoriamente",
        address_client: AddressClient,
      })
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "OCURRIÓ UN PROBLEMA, en el update de AdressClientController"
      });
    }
  },

  list: async (req,res) => {
    try {
            let ADDRESS_CLIENT  = await models.AddressClient.find({user:req.query.user_id}).sort({'createdAt':-1});
  
          res.status(200).json({
            address_client: ADDRESS_CLIENT
          });
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "OCURRIÓ UN PROBLEMA, en el list de AdressClientController"
      });
    }
  },

  remove: async (req,res) => {
    try {
       await models.AddressClient.findByIdAndDelete({_id: req.params._id});
            res.status(200).json({
              message:  "Super! La dirección del cliente se eliminó satisfactoriamente",
            });
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "OCURRIÓ UN PROBLEMA, en el delete de AdressClientController"
      });
    }
  },
}


import models from "../models";

import fs from 'fs';
import handlebars from 'handlebars';
import ejs from 'ejs';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

async function send_email(sale_id) {
  try {
    var readHTMLFile = function(path, callback) {
      fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
          if (err) {
              throw err;
              callback(err);
          }
          else {
              callback(null, html);
          }
      });
    };

    let Order = await models.Sale.findById({_id: sale_id}).populate("user");
    let OrderDetail = await models.SaleDetail.find({sale:  Order._id}).populate("product").populate("variedad");
    let AddressSale = await models.SaleAddress.findOne({ sale: Order._id});

    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
      user: 'adel.enlinea@gmail.com',
      pass: 'pwnnaljiypxkjtnm'
      }
    }));

    readHTMLFile(process.cwd() + '/mails/email_sale.html', (err, html)=>{

      OrderDetail.map((detail) => {
        detail.product.imgs = process.env.URL_BACKEND+"/api/products/uploads/product/"+detail.product.portada;
        return detail;
      });
                                
      let rest_html = ejs.render(html, {order: Order, address_sale: AddressSale, order_detail: OrderDetail});

      var template = handlebars.compile(rest_html);
      var htmlToSend = template({op:true});

      var mailOptions = {
          from: 'adel.enlinea@gmail.com',
          to: Order.user.email,
          subject: 'Finalizada tu compra ' + Order._id,
          html: htmlToSend
      };
    
      transporter.sendMail(mailOptions, function(error, info){
          if (!error) {
              console.log('Email sent: ' + info.response);
          }else {
            console.log(error);
          }
      });
  
  });

  // res.status(200).json({
  //   message: "Super! Se envio un correo a su direccion de email, con la informacion de su compra"
  // });

  } catch (error) {
    // console.log(error);
    //   res.status(500).send({
    //     message: "OCURRIÓ UN PROBLEMA",
    //   });
  }
}


export default {
  register: async (req,res) => {
    try {
      let sale_data = req.body.sale;
      let sale_address_data = req.body.sale_address;

      let SALE = await models.Sale.create(sale_data);
      sale_address_data.sale = SALE._id;

      let SALE_ADDRESS = await models.SaleAddress.create(sale_address_data);

      let CARTS = await models.Cart.find({user:SALE.user});

      for (let CART of CARTS) {
        CART = CART.toObject();
        CART.sale = SALE._id

        //START DESCUENTO DE INVENTARIO

        if(CART.variedad){//Si es multiple inventario
          let VARIEDAD = await models.Variedad.findById({_id:CART.variedad});
          let new_stock = VARIEDAD.stock - CART.cantidad;

          await models.Variedad.findByIdAndUpdate({_id: CART.variedad },{
            stock:  new_stock,
          })
        
        }else{//Si es unitario inventario
          let PRODUCT = await models.Product.findById({_id: CART.product });

          let new_stock = PRODUCT.stock - CART.cantidad;

          await models.Product.findByIdAndUpdate({_id: CART.product },{
            stock:  new_stock,
          });
        }
        //END DESCUENTO DE INVENTARIO

        //console.log(CART);

        await models.SaleDetail.create(CART);
        await models.Cart.findByIdAndDelete({_id: CART._id});
      }

      await send_email(SALE._id);

      res.status(200).json({
        message: " Super! La orden fue registrada satisfactoriamente"
      })

    } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "OCURRIÓ UN PROBLEMA"
        });
    }
  },
}

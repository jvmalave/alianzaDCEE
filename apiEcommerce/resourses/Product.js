export default{
  product_list: (product, variedades = [], avg_review = 0, count_review = 0, CampaignDiscount = null) => {
    var IMAGEN_TWO = "";
    let GALERIAS = [];
      if(product.galerias && product.galerias.length > 0){//NUEVO POR AGREGAR

        GALERIAS = product.galerias.map((galeria) => {
          galeria.imagen = process.env.URL_BACKEND+'/api/products/uploads/product/'+galeria.imagen;
                 return galeria;
             });
             var VAL = Math.floor(Math.random() * product.galerias.length);//0,1,2
             IMAGEN_TWO = GALERIAS[VAL].imagen;
       }//NUEVO POR AGREGAR

    return{
      _id: product._id,
      title: product.title,
      imagen:process.env.URL_BACKEND+"/api/products/uploads/product/"+product.portada, 
      state: product.state,
      slug: product.slug,
      sku: product.sku,
      categorie:product.categorie,
      price_bs:product.price_bs,
      price_usd:product.price_usd,
      stock:product.stock,
      description: product.description,
      resumen:product.resumen,
      tags:product.tags? JSON.parse(product.tags) : [],
      type_inventario:product.type_inventario,
      condition:product.condition,
      variedades: variedades,
      imagen_two: IMAGEN_TWO, 
      galerias: GALERIAS,
      avg_review: avg_review,
      count_review: count_review,
      campaign_discount: CampaignDiscount,
      seller_id: product.seller_id,
    }
  }
}

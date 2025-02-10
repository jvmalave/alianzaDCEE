export default{
  cart_list: (cart) => {
    return{
      user: cart.user,
      product:{
        _id: cart._id,
        title: cart.title,
        imagen:"http://localhost:3000"+"/api/products/uploads/product/"+cart.product.portada, 
        state: cart.state,
        slug: cart.slug,
        sku: cart.sku,
        categorie:cart.categorie,
        price_bs:cart.price_bs,
        price_usd:cart.price_usd,
        condition:cart.condition,
      },
      type_discount: cart.type_discount,
      discount: cart.discount,
      cantidad: cart.cantidad,
      variedad: cart.variedad,
      code_cupon: cart.code_cupon,
      code_discount: cart.code_discount,
      price_unit: cart.price_unit,
      subtotal: cart.subtotal,
      total: cart.total,
      
    }
  }
}

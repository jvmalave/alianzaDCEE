export default{
  cart_list: (cart) => {
    return{
      _id:cart._id,
      user: cart.user,
      product:{
        _id: cart.product._id,
        title: cart.product.title,
        imagen:"http://localhost:3000"+"/api/products/uploads/product/"+cart.product.portada, 
        state: cart.product.state,
        slug: cart.product.slug,
        sku: cart.product.sku,
        categorie: cart.product.categorie,
        price_bs: cart.product.price_bs,
        price_usd: cart.product.price_usd,
        condition: cart.product.condition,
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

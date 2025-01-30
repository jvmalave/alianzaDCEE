export default{
  product_list: (product, variedades = []) => {
    return{
      _id: product._id,
      title: product.title,
      imagen:"http://localhost:3000"+"/api/products/uploads/product/"+product.portada, 
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
      galerias:product.galerias.map((galeria) =>{
        galeria.imagen = "http://localhost:3000"+"/api/products/uploads/product/"+galeria.imagen;
        return galeria;
      })
    }
  }
}

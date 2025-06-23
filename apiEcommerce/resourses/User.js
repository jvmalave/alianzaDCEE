export default{
  user_list: (user) => {
    return{
      _id: user._id,
      name: user.name,
      surname: user.surname,
      rol: user.rol,
      email: user.email,
      sellerUserId: user.sellerUserId,
      company: user.company
      

    }
  }
}
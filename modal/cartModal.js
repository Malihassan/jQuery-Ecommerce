import { getProductById } from "./categoryModal.js";

const addItemInCart = async (catgoryName, itemId) => {
  let item = await getProductById(catgoryName, itemId);
  let cartModel = window.localStorage.getItem("cart");
  if (cartModel == null) {
    window.localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id: item[0].id,
          catgoryName:catgoryName,
          name: item[0].name,
          price: item[0].price,
          img: item[0].image,
          amount: 1,
        },
      ])
    );
    return { res: "Add item success" };
  }
  cartModel = JSON.parse(cartModel);
  let indexItem = cartModel.findIndex((elemnt) => {
    return elemnt.id === itemId;
  });
  if (indexItem == -1) {
    cartModel.push({
      id: item[0].id,
      catgoryName:catgoryName,
      name: item[0].name,
      price: item[0].price,
      img: item[0].image,
      amount: 1,
    });
    window.localStorage.setItem("cart", JSON.stringify(cartModel));
    return { res: "Add item success" };
  } else {
    cartModel[indexItem].amount++;
    window.localStorage.setItem("cart", JSON.stringify(cartModel));
    return { res: `Add ${cartModel[indexItem].amount++} item success` };
  }
};

const incrementItemInCart =async (itemId)=>{
  let cartModel =  getCartItems()
  let indexItem = cartModel.findIndex((elemnt) => {
    return elemnt.id === itemId;
  });
  if ( cartModel[indexItem].amount == 5) {
    return 'the maximum 5 item'
  }
  cartModel[indexItem].amount++;
  window.localStorage.setItem("cart", JSON.stringify(cartModel));
    return `Increment Item Success`;
}
const decrementItemIncart = async (itemId) => {
  let cartModel =  getCartItems()
  let indexItem = cartModel.findIndex((elemnt) => {
    return elemnt.id === itemId;
  });
  if (cartModel[indexItem].amount === 1) {
      cartModel.splice(indexItem,1)
      window.localStorage.setItem("cart", JSON.stringify(cartModel));
      return 'item removed'
  }else{
    cartModel[indexItem].amount--;
    window.localStorage.setItem("cart", JSON.stringify(cartModel));
    return `Decrement Item Success`;
  }
};

const getCartItems =  ()=>{
  let cartModel = window.localStorage.getItem("cart");
  if (cartModel == null) {
    return null;
  }
  cartModel = JSON.parse(cartModel);
  return cartModel
}
const clearCart = ()=>{
  window.localStorage.removeItem('cart')
}

export {getCartItems, addItemInCart ,clearCart,decrementItemIncart,incrementItemInCart};

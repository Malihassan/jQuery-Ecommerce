import { getProductById } from "../modal/categoryModal.js";
async function addFavoriteItem(catgoryName, itemId) {
  let item = await getProductById(catgoryName, itemId);
  let favItem = getFavItems();
  if (favItem == null) {
    window.localStorage.setItem(
      "fav",
      JSON.stringify([
        {
          id: item[0].id,
          catgoryName: catgoryName,
          name: item[0].name,
          price: item[0].price,
          img: item[0].image,
        },
      ])
    );
    return "Add Item as Favorite";
  }
  let indexItem = favItem.findIndex((elemnt) => {
    return elemnt.id === itemId;
  });
  if (indexItem == -1) {
    favItem.push({
      id: item[0].id,
      catgoryName: catgoryName,
      name: item[0].name,
      price: item[0].price,
      img: item[0].image,
    });
    window.localStorage.setItem("fav", JSON.stringify(favItem));
    return "Add Item as Favorite";
  } else {
    return "Item Exist at Favorite";
  }
}
const removedFavorite = (itemId) => {
  let favItem = getFavItems();
  let indexItem = favItem.findIndex((elemnt) => {
    return elemnt.id === itemId;
  });
  favItem.splice(indexItem, 1);
  window.localStorage.setItem("fav", JSON.stringify(favItem));
  return `Removed Item Success`;
};
const getFavItems = () => {
  let favModel = window.localStorage.getItem("fav");
  if (favModel == null) {
    return null;
  }
  favModel = JSON.parse(favModel);
  return favModel;
};
export { getFavItems, addFavoriteItem, removedFavorite };

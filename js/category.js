import {
  addFavoriteItem,
  removedFavorite,
  getFavItems,
} from "../modal/favoriteModal.js";
import {
  getCategoryByName,
  getAllCategoryType,
} from "../modal/categoryModal.js";
import {
  getCartItems,
  addItemInCart,
  clearCart,
  decrementItemIncart,
  incrementItemInCart,
} from "../modal/cartModal.js";
$(window).load(async function () {
  try {
    let category = getUrlParameter("type");
    if (!category) {
      throw new Error("Type Of Category Not Found");
    }
    let itemsList = await getCategoryByName(category);
    $(".intro-slide img").attr("src", itemsList[0].categoryImg);
    if (itemsList[0].items.length == 0) {
      throw new Error("Sorry No Items in this Category");
    }
    showProductsCategory(itemsList);
    asideCategorySlide();
    $(document).on("click", ".product-action", addItemHandeler);
    $(".cart-btn").click(cartDialogHandele);
    $(document).on("click", "#increment", incrementItemHandeler);
    $(document).on("click", "#decrement", decrementItemHandeler);
    $(document).on("click", ".fav", addFavoriteHandeler);
    $(".fav-btn").click(favoriteDialogHandler);
    $(document).on('click','.fav-delete',deleteFavHandler)
  } catch (error) {
    $(".container-gallery").append(`<h2> ${error.message} </h2>`);
  }
});
function getUrlParameter(name) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === name) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
}
function showProductsCategory(itemsList) {
  let container = "";
  let content = itemsList[0].items.map((item) => {
    container = `<div class =product-container>
        <figure class=product-item>
        <img class=product-img src=${item.image}>
        <i class="fav bi-suit-heart" value=${item.id}></i>
        <button class="product-action" value=${item.id}>
        <i class="bi bi-cart"></i>
                add to cart
              </button>
        </figure>
        <div class=product-body>
              <label class=name>${item.name}</label>
              <label class=description>${item.description}</label>
              <label class=price>LE ${item.price}</label>
            </div>
        </div>
        `;
    return container;
  });
  $(".container-gallery").append(content);
}
async function asideCategorySlide() {
  $(".category-Slide").click(function () {
    $(`.categort-type`).slideToggle();
  });
  let categoriesType = await getAllCategoryType();
  categoriesType.map((item) => {
    $(".categort-type").append(
      `<a href=category.html?type=${item} class=category-type-name>${item}</a>`
    );
  });
}
async function addItemHandeler() {
  const id = $(this).val();
  let resMessage = await addItemInCart(getUrlParameter("type"), id);
  cartMessageHandeler(resMessage.res);
}
async function cartDialogHandele() {
  let cart = getCartItems();
  if (!cart) {
    cartMessageHandeler("No Item In The Cart");
    return;
  }
  appendItemInDialog(cart);
  let myDialog = $(".dialog").dialog({
    modal: true,
    autoOpen: false,
    width: 400,
    maxHeight: 400,
    buttons: {
      Checkout: function () {
        cartMessageHandeler("Thank you . Success Transaction");
        myDialog.dialog("close");
        clearCart();
      },
      Cancel: function () {
        myDialog.dialog("close");
      },
    },
    show: { effect: "blind", duration: 800 },
  });
  myDialog.dialog("open");
}
async function appendItemInDialog(cart) {
  let total = 0;
  let container = cart.map((item) => {
    total += item.amount * item.price;
    return `<div class="cart-item">
    <div class="cart-item-body">
      <div class="cart-item-name">
        <h4>${item.name}</h4>
        <h5>${item.amount}x LE ${item.price.toFixed(2)}</h5>
      </div>
      <div class="cart-control">
        <button id=increment value=${item.id} category=${
      item.catgoryName
    }>+</button>
        <label>${item.amount}</label>
        <button id=decrement value=${item.id} category=${
      item.catgoryName
    }>-</button>
      </div>
    </div>
    <div class="cart-item-img">
      <img src=${item.img}>
    </div>
  </div>`;
  });
  container += `<div class="total-Price">
    <label>Total</label>
    <label>LE${total.toFixed(2)}</label>
  </div>`;
  $(".dialog").empty().append(container);
}
async function incrementItemHandeler() {
  await incrementItemInCart($(this).val());
  appendItemInDialog(getCartItems());
}
async function decrementItemHandeler() {
  await decrementItemIncart($(this).val());
  appendItemInDialog(getCartItems());
}
async function addFavoriteHandeler() {
  let res = await addFavoriteItem(
    getUrlParameter("type"),
    $(this).attr("value")
  );
  cartMessageHandeler(res);
}
function favoriteDialogHandler() {
  let fav = getFavItems();
  if (!fav) {
    cartMessageHandeler("No Favorite Item");
    return;
  }
  appendFavItemInDialog(fav);
  let myDialog = $(".dialog").dialog({
    modal: true,
    autoOpen: false,
    width: 400,
    maxHeight: 400,
    buttons: {
      Cancel: function () {
        myDialog.dialog("close");
      },
    },
    show: { effect: "blind", duration: 800 },
  });
  myDialog.dialog("open");
}
function appendFavItemInDialog(fav) {
  let container = fav.map((item) => {
    return `
    <div class="cart-item">
      <div class="cart-item-body">
        <div class="fav-item-name">
          <h4>${item.name}</h4>
          <h5>LE ${item.price.toFixed(2)}</h5>
        </div>
      </div>
      <div class="cart-item-img">
        <img src=${item.img}>
      </div>
      <div class=fav-delete value=${item.id}>
        <span>X</span>
      </div>
   </div>`;
  });
  $(".dialog").empty().append(container);
}
async function deleteFavHandler() {
    await removedFavorite($(this).attr('value'))
    appendFavItemInDialog(getFavItems())
}
function cartMessageHandeler(resMessage) {
  const cartMessage = $(".cart-message");
  cartMessage.text(resMessage);
  cartMessage.toggle(500);
  cartMessage.delay(1000).fadeOut();
}

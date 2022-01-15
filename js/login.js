import { login, newAccount } from "../modal/accountsModal.js";
$(window).load(function () {
  //this style add by default
  $(".form-tab li:first-of-type").addClass("active");
  //add style when click on
  $(".form-tab li").click(changeTabStyle);
  //change signin or register window
  $("#register-btn").click(displayRegisterWindow);
  $("#singin-btn").click(displaySinginWindow);
  //signin window
  $("#singin-email").change(function () {
    let message = $(`#singin-email-message`);
    let email = $(this).val();
    let result = validEmailTextFields(email);
    message.text(result);
  });
  $("#singin-password").change(function () {
    let message = $(`#singin-password-message`);
    let pass = $(this).val();
    let result = validPasswordTextFields(pass);
    message.text(result);
  });
  $("#singin-form").submit(signinFormHandler);
  // register window
  $("#register-email").change(function () {
    let message = $(`#register-email-message`);
    let email = $(this).val();
    let result = validEmailTextFields(email);
    message.text(result);
  });
  $("#register-phone").change(function () {
    let message = $(`#register-phone-message`);
    let phone = $(this).val();
    let result = validPhoneTextFields(phone);
    message.text(result);
  });
  $("#register-password").change(function () {
    let message = $(`#register-password-message`);
    let pass = $(this).val();
    let result = validPasswordTextFields(pass);
    message.text(result);
  });
  $("#register-form").submit(registerFormHandler);
});

function changeTabStyle() {
  let self = $(this);
  $(".form-tab li").removeClass("active");
  self.addClass("active");
}
function displayRegisterWindow() {
  $("#register-window").css("display", "block");
  $("#singin-window").css("display", "none");
}
function displaySinginWindow() {
  $("#singin-window").css("display", "block");
  $("#register-window").css("display", "none");
}

async function registerFormHandler(e) {
  e.preventDefault();
  let email = $("#register-email").val();
  let phone = $("#register-phone").val();
  let pass = $("#register-password").val();

  if (
    validationRegisterForm(email, phone, pass) &&
    $("#privacy").prop("checked", true)
  ) {
    if (!newAccount(email, phone, pass)) {
      $(".responseMessage").addClass("warningMessage");
      $(".responseMessage").text("email is exist");
      return;
    }
    $(".responseMessage").addClass("welocmeMessage");
    $(".responseMessage").text("Register done");
  }
}
function validationRegisterForm(email, phone, pass) {
  if (!email) {
    $(`#register-email-message`).text("Email is required");
  }
  if (!phone) {
    $(`#register-password-message`).text("Password is required");
  }
  if (!pass) {
    $(`#register-password-message`).text("Password is required");
  }
  if (email && pass && phone) {
    return true;
  }
  return false;
}

function signinFormHandler(e) {
  e.preventDefault();
  let email = $("#singin-email").val();
  let pass = $("#singin-password").val();

  if (validationSigninForm(email, pass)) {    
    if (!login(email, pass )) {
      $(".responseMessage").addClass("warningMessage");
      $(".responseMessage").text(" email or password is wrong");
      return ;
    }
    window.location.href = "index.html";

  }
}
function validationSigninForm(email, pass) {
  if (!email) {
    $(`#singin-email-message`).text("Email is required");
  }
  if (!pass) {
    $(`#singin-password-message`).text("Password is required");
  }
  if (email && pass) {
    return true;
  }
  return false;
}

function validEmailTextFields(email) {
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.trim().length == 0) {
    return "Email is required";
  }
  if (!email.toLowerCase().match(regEx)) {
    return "Invalid email address";
  }
  return "";
}
function validPasswordTextFields(pass) {
  if (pass.trim().length == 0) {
    return "Password is required";
  }
  return "";
}
function validPhoneTextFields(phone) {
  if (!phone.match("^01[0125][0-9]{8}$")) {
    return "Invalid Phone Number";
  }
  return "";
}

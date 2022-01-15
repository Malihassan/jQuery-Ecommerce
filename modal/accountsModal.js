const login = (email, pass) => {
    console.log(pass);
  let account = getUserByEmail(email);
  if (account.length == 0) {
    return false;
  }
  if (account[0].pass !== pass) {
    return false;
  }
  setCoockie(email, "token");
  return true
};
const newAccount = (email, phone, pass) => {
  let accountModel = window.localStorage.getItem("accounts");
  if (accountModel == null) {
    window.localStorage.setItem(
      "accounts",
      JSON.stringify([{ email, phone, pass }])
    );
    return true;
  }
  const emailExist = getUserByEmail(email);
  if (emailExist.length !== 0) {
    return false;
  }

  accountModel = JSON.parse(accountModel);
  accountModel.push({ email, phone, pass });
  window.localStorage.setItem("accounts", JSON.stringify(accountModel));
  return true;
};
const getUserByEmail = (email) => {
  let accountModel = JSON.parse(window.localStorage.getItem("accounts"));
  let account = accountModel.filter((item) => {
    return item.email == email;
  });
  if (account.length == 0) {
    return [];
  }
  return account;
};

function setCoockie(token, cookisName) {
  document.cookie = `${cookisName}=${token};max-Age= 1800;`;
}
function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : null;
}

export { login, newAccount,getCookie };

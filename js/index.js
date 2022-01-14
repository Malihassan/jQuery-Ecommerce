$(window).load(function(){
    $('.category-content').mouseenter(showShopNowButton)
    $('.category-content').mouseleave(hideShopNowButton)
    $('.shopNow').click(forwardToCategory)
    $('.login').click(forwardToLogin)
})


function showShopNowButton() {
    $(this).find(":button").show()
}
function hideShopNowButton () {
    $(this).find(":button").hide()
}
function forwardToCategory() {
    let category = $(this).val()
    window.location = `./category.html?type=${category}`
}
function forwardToLogin() {
    window.location = `./login.html`
}

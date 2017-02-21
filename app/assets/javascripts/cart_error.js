function CartError() {
}

CartError.prototype.popupError = function (message) {
    $('#error-ribon').text(message)
}


export default new CartError()

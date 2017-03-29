
$("#address-table tr").click(function(){
    $(this).addClass("selected").siblings().removeClass("selected")
    $('#address_id').val($(this).data('address-id'))
});

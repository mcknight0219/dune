// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require clipboard.min
//= require jquery3
//= require popper
//= require china_city/jquery.china_city
//= require tether
//= require bootstrap-sprockets
//= require jquery_ujs
//= require turbolinks
//= require slick.min

jQuery("#backtotop").click(function () {
    jQuery("body,html").animate({
        scrollTop: 0
    }, 600);
});
jQuery(window).scroll(function () {
    if (jQuery(window).scrollTop() > 150) {
        jQuery("#backtotop").addClass("visible");
    } else {
        jQuery("#backtotop").removeClass("visible");
    }
});

$('nav ul li a:not(:only-child)').click(function (e) {
    $(this).siblings('.nav-dropdown').toggle();
    // Close one dropdown when selecting another
    $('.nav-dropdown').not($(this).siblings()).hide();
    e.stopPropagation();
});
// Clicking away from dropdown will remove the dropdown class
$('html').click(function () {
    $('.nav-dropdown').hide();
});

$('#nav-toggle').click(function () {
    $('nav ul').slideToggle();
});

$('#nav-toggle').on('click', function () {
    this.classList.toggle('active');
});

$('#package-type-radios label').click(function () {
    $(this).addClass('is-active').parent().siblings().children('label').removeClass('is-active')
    $(this).find('input').prop('checked', true)
    $(this).parent().siblings().children('label').find('input').prop('checked', false)
})


$("#address-table tr").click(function () {
    $(this).addClass("selected").siblings().removeClass("selected")
    $('#address_id').val($(this).data('address-id'))
});

// Package pages
$('#name_input').change(function () {
    $('#name').val($(this).val())
})

$('#brand_input').change(function () {
    $('#brand').val($(this).val())
})

$('#article_input').change(function () {
    $('#article').val($(this).val())
})

$('#specification_input').change(function () {
    $('#specification').val($(this).val())
})

$('#quantity_input').change(function () {
    $('#quantity').val($(this).val())
})

// Product details
$('.thumbnail-strip figure').click(function () {
    $('.thumbnail-strip figure').removeClass('selected')
    $(this).addClass("selected")
    $('.large-view figure img').attr('src', $(this).children('img').attr('src'))
})

$('#quantity-select').change(function () {
    $('#price').html($(this).val() + " 加元")
    $('#quantity').val($(this).find(':selected').text())
})

$('#quantity').change(function () {
    var arr = $('#price-tag').attr('data').split(';')
    var i = parseInt($(this).val()) - 1
    $('#price-tag').html(arr[i])
})

$('.slider').slick({
    lazyLoad: 'ondemand',
    autoplay: true,
    infinite: true,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    index: 2,
    dots: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1    
            }
        }
       
    ]
})
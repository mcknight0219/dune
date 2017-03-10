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
//= require jquery
//= require tether
//= require bootstrap
//= require vue
//= require vuex
//= require vue-router
//= require vue-resource
//= require jquery_ujs
//= require turbolinks

$("<option />", {selected: "selected", value: "", text: "MENU"}).appendTo("#mainav select");
$("#mainav a").each(function () {
    var e = $(this);
    if ($(e).parents("ul ul ul").length >= 1) {
        $("<option />", {value: e.attr("href"), text: "- - - " + e.text()}).appendTo("#mainav select")
    } else if ($(e).parents("ul ul").length >= 1) {
        $("<option />", {value: e.attr("href"), text: "- - " + e.text()}).appendTo("#mainav select")
    } else if ($(e).parents("ul").length >= 1) {
        $("<option />", {value: e.attr("href"), text: "" + e.text()}).appendTo("#mainav select")
    } else {
        $("<option />", {value: e.attr("href"), text: e.text()}).appendTo("#mainav select")
    }
});
$("#mainav select").change(function () {
    if ($(this).find("option:selected").val() !== "#") {
        window.location = $(this).find("option:selected").val()
    }
})

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
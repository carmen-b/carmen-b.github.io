$(function () {

    $('#portfolioItemCarrousel').owlCarousel({
        navigation: true,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });

    var address = 'contact@';
    address += 'carmenbalaban.com';

    $('a.email-address')
        .attr('href', 'mailto:' + address)
        .append(address);

    $('.contact-form')
        .attr('action', '//formspree.io/' + address)
        .bootstrapValidator();


    if (window.location.href.indexOf('sent=1') > 0) {
        $('.contact-sent').show();
    }

});
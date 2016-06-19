(function($) {
    $(function() {
        $('.button-collapse').sideNav();
        $('.parallax').parallax();
        $('.slider').slider();
        $('.carousel').carousel();
        $('.datepicker').pickadate({
            selectMonths: true,
            selectYears: 1,
            min: true,
            closeOnSelect: true,
            closeOnClear: false
        });
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 800);
                    return false;
                }
            }
        });
    });
})(jQuery);

$.extend($.fn.pickadate.defaults, {
    monthsFull: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
    monthsShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
    weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    weekdaysShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
    weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    today: 'hoje',
    clear: 'limpar',
    close: 'fechar',
    format: 'dddd, d !de mmmm !de yyyy',
    formatSubmit: 'yyyy/mm/dd'
});

$.extend($.fn.pickatime.defaults, {
    clear: 'limpar'
});


/**
 * Map functions
 */
function initMap() {
    var directionsDisplay = new google.maps.DirectionsRenderer,
        directionsService = new google.maps.DirectionsService,
        pousada = { lat: -16.3811081, lng: -39.0394762 },
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 18,
            center: pousada
        }),
        marker = new google.maps.Marker({
            position: pousada,
            map: map,
            animation: google.maps.Animation.BOUNCE,
            title: 'Pousada Porto Feliz'
        });

    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));

    var control = document.getElementById('mapview');
    control.style.display = 'block';

    var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('localizacao').addEventListener('submit', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var start = document.getElementById('origem').value;
    var end = { lat: -16.3811081, lng: -39.0394762 };
    directionsService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

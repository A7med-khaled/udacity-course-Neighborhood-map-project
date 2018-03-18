//// show or hide the menu
function toggel_button() {
    document.getElementsByClassName("menu")[0].classList.toggle("show");
}

///auto filter the list 
$('#mySearchInput').keyup(function () {
    var valThis = $(this).val();
    $('#palces_list>li').each(function () {
        var text = $(this).text().toLowerCase();
        (text.indexOf(valThis) == 0) ? $(this).show(): $(this).hide();
    });
});



///////////////////////////////////////////////////////////////
let locationDetails = [{
        lat: 30.04591596918068,
        lng: 31.224281787872314,
        title: 'Cairo tower',
        cat: 'tower'
    },

    {
        lat: 30.047847676012697,
        lng: 31.23364806175232,
        title: 'Egyptian Museum',
        cat: 'Museums'
    },

    {
        lat: 30.042488954270173,
        lng: 31.224453449249268,
        title: 'Cairo Opera House ',
        cat: 'Opera'
    },

    {
        lat: 30.045386600636032,
        lng: 31.218981742858887,
        title: 'Latino Cafe',
        cat: 'Cafe'
    },

    {
        lat: 30.044885090984188,
        lng: 31.22239351272583,
        title: 'Al Ahly Sports Club',
        cat: 'Club'
    }


];

let titless = [];

locationDetails.forEach(element => {
    titless.push(element.title);
});

let myMap;
let markers = [];

function appVM() {

    var self = this;
    self.locationTitle = ko.observableArray(titless);
    

    self.initmap = function () {
        var mapOption = {
            zoom: 16,
            center: {
                lat: 30.045916,
                lng: 31.224291
            }
        };
        myMap = new google.maps.Map(document.getElementById('map'), mapOption);
    };


    self.addmarker = function (position) {
        var marker = new google.maps.Marker({
            position: {
                lat: position.lat, //
                lng: position.lng //
            },
            map: myMap,
            animation: google.maps.Animation.DROP

        });


        var infoPopup = new google.maps.InfoWindow({
            content: '<h1>' + position.title + '</h1><h6>' + position.lat + '</h6><h6>' + position.lng + '</h6>' //
        });

        marker.addListener('click', function () {
            markers.forEach(element => {
                element.infoPopup.close();
                element.marker.setAnimation(null);
            });

            infoPopup.open(myMap, marker);
            marker.setAnimation(google.maps.Animation.BOUNCE);
        });

        markers.push({
            marker: marker,
            infoPopup: infoPopup
        });
    };

    self.initmap();

    locationDetails.forEach(element => {
        this.addmarker(element);
    });


}


function init() {
    console.log('started');
    ko.applyBindings(new appVM());
}


///when menu item clicked
function menuClick(item) {
    var text = $(item).text();
    var index = titless.indexOf(text);
    var mark = markers[index];

    markers.forEach(element => {
        element.infoPopup.close();
        element.marker.setAnimation(null);
    });

    mark.infoPopup.open(myMap, mark.marker);
    mark.marker.setAnimation(google.maps.Animation.BOUNCE);
}


//// set full window map size
function setHeight() {
    windowHeight = $(window).innerHeight();
    windowWidth = $(window).innerWidth();
    $('#map').css('min-height', windowHeight);
    $('#map').css('min-width', windowWidth - 45);
    $('.nav').css('min-height', windowHeight);
}
setHeight();

$(window).resize(function () {
    setHeight();
});
////
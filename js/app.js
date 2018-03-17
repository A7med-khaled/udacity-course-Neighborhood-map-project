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
        lat: 30.045916,
        lng: 31.224291,
        title: 'Cairo tower',
        cat: 'tower'
    },
    {
        lat: 30.075808,
        lng: 31.281116,
        title: 'Ain Shams University',
        cat: 'Universities'
    },
   
    {
        lat: 30.047503,
        lng: 31.233702,
        title: 'Egyptian Museum',
        cat: 'Museums'
    }
];




function appVM() {

    var self = this;
    var myMap;

    var markers = [];
    self.locationTitle = ko.observableArray();

    self.setLocationTitle = function () {
        locationDetails.forEach(element => {
            self.locationTitle.push(element.title);
        });
    };
    self.setLocationTitle();

    self.initmap = function () {
        var mapOption = {
            zoom: 13,
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
            map: myMap
        });


        var infoPopup = new google.maps.InfoWindow({
            content: '<h1>' + position.title + '</h1><h6>' + position.lat + '</h6><h6>' + position.lng + '</h6>' //
        });

        marker.addListener('click', function () {
            infoPopup.open(myMap, marker);
        });

        markers.push({marker:marker,infoPopup:infoPopup});
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

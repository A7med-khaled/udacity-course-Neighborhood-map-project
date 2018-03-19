
///auto filter the list 
$('#mySearchInput').keyup(function () {
    var valueOFThis = $(this).val();
    $('#palces_list>li').each(function () {
        var text = $(this).text().toLowerCase();
        (text.indexOf(valueOFThis) == 0) ? $(this).show() : $(this).hide();
    });
});


//// set full window map size
function setHeight() {
    windowHeight = $(window).innerHeight();
    windowWidth = $(window).innerWidth();
    $('#map').css('min-height', windowHeight);
    $('#map').css('min-width', windowWidth - 45);
    $('.nav').css('min-height', windowHeight);
}

$(document).ready(function () {
    setHeight();
});

$(window).resize(function () {
    setHeight();
});
////

///////////////////////////////////////////////////////////////
let locationDetails = [
    {
        lat: 30.04591596918068,
        lng: 31.224281787872314,
        title: 'Cairo tower',
        cat: 'tower'
    },
    {
        lat: 30.032,
        lng: 31.256,
        title: 'Sultan Hassan Mosque',
        cat: 'Mosque'
    },
    {
        lat: 30.045386600636032,
        lng: 31.218981742858887,
        title: 'Latino Cafe',
        cat: 'Cafe'
    },

    {
        lat: 30.029866486852946,
        lng: 31.26108169555664,
        title: 'The Saladin Citadel ',
        cat: 'historical pleace'
    },
    {
        lat: 30.047847676012697,
        lng: 31.23363733291626,
        title: 'Egyptian Museum',
        cat: 'Museum'
    }];

let titless = [];
let myMap;
let markers = [];

locationDetails.forEach(element => {titless.push(element.title);});//extract only the titles from location list


////my view model
function appVM() {

    var self = this;
    self.locationTitle = ko.observableArray(titless);//data binding to menu

    //to open info window when lick on mark or list
    self.openInfoPopup = function (marker, infoPop) {
        markers.forEach(element => {
            element.infoPopup.close();
        });

        infoPop.open(myMap, marker);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            marker.setAnimation(null);
        }, 1000);
    };

    //function to initiat the map
    self.initmap = function () {
        var mapOption = {
            zoom: 14,
            center: {
                lat: 30.03789287798655,
                lng: 31.239114287935536
            }
        };
        myMap = new google.maps.Map(document.getElementById('map'), mapOption);
    };

    //function to add marker to the map
    self.addmarker = function (position) {
        var marker = new google.maps.Marker({
            position: {
                lat: position.lat, //
                lng: position.lng //
            },
            map: myMap,
            animation: google.maps.Animation.DROP

        });

        var infoPopup = new google.maps.InfoWindow();
        ///forsquare here
        self.url = 'https://api.foursquare.com/v2/venues/search?ll=' + position.lat + ',' + position.lng + '&oauth_token=VN0M4GTNQIIBLC0MTK2AB41RKTZLRW1W4TV5D44LQBU4RQ3J&v=20180319';
        $.getJSON(self.url).done(function (json) {

            var addr1 = json.response.venues[0].location.formattedAddress[0];
            var addr2 = json.response.venues[0].location.formattedAddress[1];
            var addr3 = json.response.venues[0].location.formattedAddress[2];
            var addrCountry = json.response.venues[0].location.country;

            infoPopup.setContent("<div style='text-align: center;'><h1>" + position.title + "</h1><p>" + addr1 + "</p><p>" + addr2 + "</p><p>" + addr3 + "</p><p>" + addrCountry + "</p></div>");
        }).fail(function(){
            alert('error in foursquare Api');
        });

        marker.addListener('click', function () {
            self.openInfoPopup(marker, infoPopup);
        });

        markers.push({
            marker: marker,
            infoPopup: infoPopup
        });
    };

    ///function to handle click on list item
    self.listselect = function () {
        var index = self.locationTitle.indexOf(this.toString());
        var locat = markers[index];
        self.openInfoPopup(locat.marker, locat.infoPopup);//open target info window
    };

    //call map init function 
    self.initmap();

    //loop throgh location list to add markers
    locationDetails.forEach(element => {
        this.addmarker(element);
    });



    self.filteredList=ko.computed(function(){
        locationTitle=[];
        titless.forEach(element => {
            if(element.includes(this.toString())){
                locationTitle.push(element);
            }
        });
    });

    // google.maps.event.addListener(myMap, 'click', function (event) {
    //     alert(event.latLng);
    // });
}


///init the app
//called in google api script src
function init() {
    console.log('started');
    ko.applyBindings(new appVM());
}


function mapError(e){
    alert('error in google map api');
}




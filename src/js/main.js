
//on dom ready render page from "blocks" object
$(document).ready(function(){
    renderPage();
})

//pulling in the object given, untouched from codepen
var blocks = [
    {
        titleIcon: "https://upthere.com/media/cameraIcon-1.png",
        title: "Upthere Camera",
        subtitle: "A cloud camera with a new way to share",
        tagline: "Available for iPhone and Android",
        features: [
            {
                image: "https://upthere.com/media/camera-shared-cameras.gif",
                headline: "Shared cameras",
                summary: "With Shared Cameras, you can take photos with others as if you were all using one camera. As soon as someone takes a photo, everyone else in the Shared Camera will see it."
            },
            {
                image: "https://upthere.com/media/camera-integrate.gif",
                headline: "Direct to the cloud",
                summary: "Upthere Camera captures every photo directly to the cloud, circumventing the space limitations of your phone. So take as many photos as you'd like!"
            },
            {
                image: "https://upthere.com/media/home-1.gif",
                headline: "Unified in Upthere",
                summary: "All the photos you take with Upthere Camera go right to your unified photo collection in Upthere. These same photos are also accessible from Upthere Home."
            }
        ],
        footerImage: "https://upthere.com/media/CameraAppScreenshot.jpg"
    }
];



function renderPage(){

    //initiate sections for page view
    var $header = $('<div class="col-sm-12 page-header"></div>');
    var $features = $('<div class="col-sm-12 features"></div>');
    var $footer = $('<div class="col-sm-12 footer"></div>');



    //functions to render components
    var buildElement = function(key, item){
        if ( (/\.(gif|jpg|jpeg|tiff|png)$/i).test(item) ){
            return buildImg(item, key);
        }
        else if (typeof item === 'object'){
            return buildCards(item);
        }
        return buildDiv(item, key);
    }

    var buildImg = function(src, class){
        return '<img src="'+src+'" class="'+class+'"></img>';
    }

    var buildCards = function(features){

        return features.map(function(feature){

            var $card = $('<div class="features-card col-sm-4"></div>');

            Object.keys(feature).forEach(function(key){
                var item = feature[key];
                $($card).append(buildElement(key, item));
            });

            return $card;
        })
    }

    var buildDiv = function(content, class){
        return '<div class="'+class+'">'+content+'</div>';
    }




    //pull data and generate components from "blocks" object
    Object.keys(blocks[0]).forEach(function (key) {
        var item = blocks[0][key];

        //append to section based on content classification
        if(typeof item === 'string' && key.indexOf('footer') === -1){
            $($header).append(buildElement(key, item));
        }
        else if (typeof item === 'object') {
            $($features).append(buildElement(key, item));
        } else {
            $($footer).append(buildElement(key, item));
        }

    });


    //take built sections and compile into a single element to append to DOM
    var $buildView = $('<div class="container"></div>');
    var viewComponents = [$header, $features, $footer];

    $.each(viewComponents, function(index, value){
        var $row = $('<div class="row"></div>');
        $($row).append(value);
        $($buildView).append($row);
    })

    $('body').append($buildView);

}

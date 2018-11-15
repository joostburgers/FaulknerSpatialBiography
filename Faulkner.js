//add your token here
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9vc3RidXJnZXJzIiwiYSI6ImNqZmZjaGtzaDRrMncycXBrazdzNzFzZXUifQ.7MZmVPD9cq_QtgpzkcZPyA';
var chapters = {
    'part-1': {
        center: [-86.495, 35.656],
        zoom: 5,
        bearing: 0,
        pitch: 15
    },
    'part-2': {
      center: [-90.066903, 29.954326],
      zoom: 14,
        bearing: 0,
        pitch: 0
    },
    'part-3': {
      center: [-80.996529,32.074434],
      zoom: 8.6,
        bearing: -60.00,
        pitch: 45

    },
    'part-4': {
      center: [8.928762, 44.394093],
      zoom: 14.5,
        bearing: 15,
        pitch: 60
    },
    'part-5': {
      center: [8.873978, 46.459123],
      zoom: 12.0,
        bearing: 0,
        pitch: 0

    },
    'part-6': {
      center: [2.340187, 48.850399],
      zoom: 14.1,
        bearing: 0,
        pitch: 30
    },
    'part-7': {
      center: [-40.222376, 41.993791],
      zoom: 1.4,
        bearing: 0,
        pitch: 0
    },
    'part-8': {
      center: [-40.222376, 41.993791],
      zoom: 1.4,
        bearing: 0,
        pitch: 0
    }


};

var map;

window.onload = function() {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/joostburgers/cjjhz9hlc3i1w2rlhp7ayih8f', // change this to your style
        center: [-89.519, 34.366],
        zoom: 15.5,
        bearing: 0, //direction
        pitch: 30 // angle
    });
    //
    var slider1 = document.getElementById('slider1');
     var sliderValue = document.getElementById('slider-value');


//TOGGLE BOXES, LEGEND, INFOBOX, POPUP BOX, CODE START -----------------------------------------------
//This will launch the code for the INFOBOX and the LEGEND once the map is done loading
//
  map.on('load', function() {

  var toggleableLayerIds = ['Books Read','Fan Mail'];

  map.setLayoutProperty(toggleableLayerIds[0], 'visibility', 'none');
  map.setLayoutProperty(toggleableLayerIds[1], 'visibility', 'none');

   for (var i = 0; i < toggleableLayerIds.length; i++) {
      var id = toggleableLayerIds[i];

       var link = document.createElement('a');
       link.href = '#';
       link.className = '';
       link.textContent = id;

       link.onclick = function (e) {
           var clickedLayer = this.textContent;
          // map.flyTo(chapters['part-7'])
           e.preventDefault();
           e.stopPropagation();

           var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

           if (visibility === 'visible') {
               map.setLayoutProperty(clickedLayer, 'visibility', 'none');
               this.className = '';
           } else {
               this.className = 'active';
               map.setLayoutProperty(clickedLayer, 'visibility', 'visible');

           }
       };

     var layers = document.getElementById('menu');
     layers.appendChild(link);
 }
//
// //START LEGEND CODE ===========================================================
//
// //LEGEND TEXT
// //the var layers array sets the text that will show up in the legend.
// //you can enter any value here it is just text. Make sure that the Legend
// //values correspond to the ones you set in Mapbox.
   var layers = ['Faulkner', 'Joyce', 'Stein'];
//
// //LEGEND COLORS
// //Set the corresponding LEGEND colors using HEX the easiest way to do this is by
// //setting your mapcolors in Mapbox using ColorBrewer (colorbrewer2.org). Then
// //copy the exact same hex value to the array below. Remember that each label
// //above should correspond to a color. If the number of items in layers does not
// //match the number of values in colors you will get an error.
//
//
   var colors = ['#fdd317', '#298221', '#9f0975'];
//
// //YOU DO NOT NEED TO CHANGE ANY OF THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   for (i = 0; i < layers.length; i++) {
     var layer = layers[i];
     var color = colors[i];
     var item = document.createElement('div');
     var key = document.createElement('span');
     key.className = 'legend-key';
     key.style.backgroundColor = color;

     var value = document.createElement('span');
     value.innerHTML = layer;
     item.appendChild(key);
     item.appendChild(value);
     legend.appendChild(item);
   }
// //LEGEND CODE FINISHED======================================================
// //---------------------------------------------------------------------------
//
// //POPUP CODE BEGIN========================================================
// //CONTEXT
// //The code below creates a pop-up box when you float over an area of the mapbox
// //because the popup box is pretty limited it will just contain text, but cannot
// //be formatted in any special way. The popup box is good if you only want to show
// //one or two data points. If you don't plan on using it comment everything out.
//
//
// var popup = new mapboxgl.Popup({
//       closeButton: false,
//       closeOnClick: false,
//
//   });
//
// //CHANGE -------------------------------------------------------------
//
 // map.on('mouseenter', 'AreaMentionedTotal1800', function (e) { //REPLACE 'AreaMentionedTotal' with the name of your layer.
 //       map.getCanvas().style.cursor = 'pointer';
//
// //MAKE CUSTOMIZATION
  //     var name = '<br><strong>Name: </strong>' + e.features[0].properties.Name + '</br>';
    // var story ='<br><strong>StoryName: </strong>' + e.features[0].properties.StoryName + '</br>';
    // var year = '<br><strong>Year: </strong>' + e.features[0].properties.NarYear + '</br>;'
      // var descriptionarray = [name, story, year];
    //  var description= descriptionarray.join("");

      // popup.setLngLat(e.lngLat)
        //     .setHTML(description)
          //  .addTo(map);
    //  });
    //  map.on('mouseleave', 'AreaMentionedTotal1800', function() { //REPLACE 'AreaMentionedTotal' with the name of your layer.
    //      map.getCanvas().style.cursor = '';
    //      popup.remove();
    // });
// //POPUP CODE END ============================================================






//START INFOBOX CODE =======================================================

//CONTEXT----------------------------------------------------------------
//The infobox is "triggered" by the mousemove function. That is, when your mouse
//moves over a certain area the function activates. It then pulls information
//from the layer in order to display it.
//The two things you will set here are the layer you are pulling information
//and the information you are going to display.

map.on('mousemove', function(e) {

//CONTEXT-------------------------------------------------
// This makes a temporary version of the layer from which we will pull data based
//on the area the mouse cursor is pointing over (e.point). So if we are hovering
//over CP it will pull up the information on CP. In order, to be able to do this
//the computer needs to know where to find this information.
//In this case, the layer is AreaMentionedTotal. Just so the script grabs the most
//up to date layer please publish your project.
//Now go to mapbox figure out what layer you want info for and copy the name exactly
//and replace AreaMentionedTotal.

//MAKE CHANGE-----------------------------------------------------------------
  var info = map.queryRenderedFeatures(e.point, {
   layers: ['faulkner','joyce', 'stein'] //REPLACE AreaMentionedTotal with the Name
                                  //of your layer
    });

//CONTEXT -----------------------------------------------------------------
//The code below looks a bit overwhelming! Essentially, what we will be doing
//is telling the computer what information about what features we want to display.
//The code below produces the name of the location, the name of the story, the Quote
// and the page number.
//Since, these values are going to change depending on where I scroll I want to
//get these pieces of information based on variables and not absolute values.
//I do this by looking at the Info variable I greated earlier. Since, this variable
//contains all the values of the area my mouse is currently over, I can display whatever
//values I want: Name, NarYear, BirCntry, etc. I access these values by saying
//info[0].properties.NarYear. That is, give me the current value of the NarYear column.
//Whatever attributes are part of the layer can be accessed. So, info[0].properities.Note
//is an option if you really want to display that. So really, the only thing you
//are changing here is the value after the properities. to match with what you want to show.
//You'll also notice that there are pieces in double quotes like "Name: ".
//This is constant and Name: will always show on a scroll over. You'll note that
//this text is connected with the variable info[0].properties.Name through a
//plus sign ( + ). If computers want to add text together they need to concatenate.
//If I write "Programming " + "is " + "fun.", the output will be Programming is fun.
//Thus if you want to change the labels of the text before the variable this is
//what you change.



//MAKE CHANGE---------------------------------------------------------------
    if (info.length > 0) {
      var image = info[0].properties.Image;
      document.getElementById('pd').innerHTML = '<h5>' + "Name: " + info[0].properties.Name + '</h5>' + '<h5>' + "Description: " + '</h5>' + '<p>'+ info[0].properties.descriptio + '</p>' + '<center>'+'<img width=90% src="'+image+'"/>'+'</center>'; // + "Publishing Language: "; //+ info[0].properties.PubLang '</p>' ; // //'</p><p>' + "Author: " + info[0].properties.AuthorName + '</p>';


      //Depending on what you want to show you can add more variable and more text
      //The stub above generates the StoryName, The quote, and the page number in parenthesis.
      //in order to use it delete the following text after </h5> (';//)
    } else {
    document.getElementById('pd').innerHTML = '<p>Hover over an area</p>';
    }


  });


    slider1.addEventListener('input', function(e) {
            // Adjust the layers opacity. layer here is arbitrary - this could
            // be another layer name found in your style or a custom layer
            // added on the fly using `addSource`.
            map.setPaintProperty('AreaMentionedTotal', 'fill-opacity', parseInt(e.target.value, 10) / 100);

            // Value indicator
            sliderValue.textContent = e.target.value + '%';
        });

});
//TIME SLIDER
 document.getElementById('slider2').addEventListener('input', function(e) {
 var hour = parseInt(e.target.value);

 map.setFilter('AreaMentionedTotal', ['<=', ['number', ['get', 'NarYear']], hour]);

// converting 0-23 hour to AMPM format

 var hour12 = hour

// // update text in the UI
 document.getElementById('active-hour').innerText = hour12 //+ ampm;
});
}

//SLIDESHOW CODE DO NOT TOUCH!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

window.onscroll = function() {
    var chapterNames = Object.keys(chapters);
    console.log(chapterNames);
    for (var i = 0; i < chapterNames.length; i++) {
        var chapterName = chapterNames[i];
        if (isElementOnScreen(chapterName)) {
            setActiveChapter(chapterName);
            break;
        }
    }
};

var activeChapterName = 'part-1';
function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;

    map.flyTo(chapters[chapterName]);

    document.getElementById(chapterName).setAttribute('class', 'active');
    document.getElementById(activeChapterName).setAttribute('class', '');

    activeChapterName = chapterName;
}

function isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top <= window.innerHeight && bounds.bottom > 10;
}

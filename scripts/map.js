var mymap = L.map('mapid').setView([52.372, 4.89], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoieWFiYnkiLCJhIjoiY2szc3RhbGZxMDl1ZDNobzRiOGdlMTdxNCJ9.8o_CuS9mw7IAMoBbH2zvtQ'
}).addTo(mymap);



function assignColor(toilet){
    let marker;
    switch(toilet){
    case "Amsterdamse krul (m)": {
        marker = "#de2d26";
      return marker;
    }
    case "Gewenst toilet": {
        marker = "#31a354";
      return marker;
    }
    case "Urilift (m)": {
        marker = "#fdae6b";
      return marker;
    }
    case "Openbaar toilet (m/v)": {
        marker = "#31a354";
      return marker;
    }
    case "Openbaar toilet, toegankelijk voor mindervaliden (m/v)": {
        marker = "#7fcdbb";
      return marker;
    }
    case "Seizoen (m/v)": {
        marker = "#c51b8a";
      return marker;
    }
    case "Toilet in parkeergarage (m/v)": {
        marker = "#edf8b1";
      return marker;
    }
    default: { 
        marker = 'black'
      return marker
    }
  }
}

const retrieveToilets = async () => {
    let toiletLocations = await getToilets()
    cleanToilets(toiletLocations);
}

const getToilets = () => {
    return fetch('../geojson/OPENBARE_TOILETTEN.json')
        .then(d => d.json())
        .then(json => {
            console.log(json)
            return json;
        })
}

const cleanToilets = (features) =>{
    let featurelist = features.features;
    featurelist.forEach(feature => {
    let featureProp = feature.properties;
    let newcolor = "steelblue";   
    newcolor = assignColor(featureProp.Soort);

    featureProp = {
      open: featureProp.Dagen_geopend,
      foto: featureProp.Foto,
      desc: featureProp.Omschrijving,
      open: featureProp.Openingstijden ? featureProp.Openingstijden : 'Niet bekend',
      prijs: featureProp.Prijs_per_gebruik === 0 ? 'gratis' : '50cent',
      selectie: featureProp.SELECTIE,
      soort: featureProp.Soort ? featureProp.Soort : "none",
      color: newcolor
    };
    feature.properties = featureProp;
  });
  placeToilets(featurelist)
}

const placeToilets = async (locations) => {
    await L.geoJSON(locations, {
        pointToLayer: function (feature, latlng) {
            var geojsonMarkerOptions = {
                radius: 8,
                fillColor: feature.properties.color,
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8,
                className: 'marker ' + feature.properties.soort + ' ' + feature.properties.prijs
            };
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: function (feature, featureLayer) {
            featureLayer.bindPopup(feature.properties.desc + '<br>' + feature.properties.soort + '<br>' + 'Open: ' + feature.properties.open);
        }
    }).addTo(mymap);

}

retrieveToilets();
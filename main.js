const https = require('https');
const express = require("express");
const fetch = require('node-fetch');
const app = express();
const asyncExpress = require('./config/asyncHandler.js');
app.listen(5000, () => {
    console.log(`App listening on Port: 5000`);
});

app.get("/:latitude/:longitude", asyncExpress(async req=>{
  let params = {
   lat: parseFloat(req.params.latitude),
   lon: parseFloat(req.params.longitude)
  }
  let queryString = "?";
  for (let key in Object.keys(params)){
   if(queryString.length != 1){
          queryString += "&";
   }
   queryString += key + "=" + params[key];
  }
  console.log(params['lat']);
  console.log(params['lon']);
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyB7v_MFJjM9WpS2pCNI5wIYneXXcgKCPeM&location="+params['lat']+","+params['lon']+"&radius=1609&type=restaurant";
 let results = [];
 let respStream = await fetch(url, { method: 'GET'});
 let json = await respStream.json();
//   .then(res => res.json())
//   .then(json => {
//       console.log(json.results);
      console.log(json);
      console.log(json.results);
      results = json.results.map(result=> ({
      location: result.geometry.location,
      name: result.name,
      price_level: result.price_level,
      rating: result.rating,
      vicinity: result.vicinity
      }));
//	console.log(results.length)
//        
    return {
	status: 200,
	content: results
    };
//   });


}));



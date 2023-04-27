const express = require('express');

const router = express.Router()

function processDate(request, response){
  // function to process api requests
  
  const dateInput = request.params.date; // get "date" param from url
  
  let dateConverted = undefined; 

  if (dateInput){ // if "date" was passed in the url  
    if (dateInput.includes("-") || dateInput.includes("/")){ // for example, 2015-12-25 or 2015/12/25
      dateConverted = new Date(dateInput);
    }      
    else{ // for example 1451001600000 (time in milliseconds since unix epoch)
      dateConverted = new Date(parseInt(dateInput)); 
    }
  }
  else { // if "date" was not passed in the url
    dateConverted = new Date();    
  }

  // 
  const dateInMilliseconds = dateConverted.getTime(); // date in milliseconds since unix epoch
  const dateInUTC = dateConverted.toUTCString(); // date in UTC format

  let dateJson = undefined;
  if (isNaN(dateInMilliseconds)){ // if bad "date"
    dateJson = {error: "Invalid Date"}; // report error as a json object
  }
  else{
    // date info as a json object
    dateJson = {unix: dateInMilliseconds, utc: dateInUTC};    
  }

  // send response in json format
  response.json(dateJson);  
}    
  
// router definition
router.get("/:date?", processDate); // function "processDate" serves requests at the ""/api/:date?"" endpoint

module.exports = router; // make "router" object available for other modules

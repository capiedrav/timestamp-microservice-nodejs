const express = require('express');

const router = express.Router()

function dateToUtc(date){
  /* 
  formats date to: weekday, d m y hh:mm:ss GMT
  for example: Fri, 25 Dec 2015 00:00:00 GMT
  */
  
  let dateElements = date.toString().split("+")[0].split(" ");
  dateElements[0] += ",";
  return dateElements.join(" ");
}

function processDate(request, response) {
  const dateInput = request.params.date;
  try {
    if (dateInput){
      const dateConverted = new Date(dateInput);
    }      
    else{
      const dateConverted = new Date(); // if not date passed, get current date
    }      
    const dateJson = { // date info as a json object
      unix: dateConverted.getTime(), // time in milliseconds
      utc: dateToUtc(date) // date in weekday, d m y hh:mm:ss GMT format
    }
    // send response
    response.json(dateJson);
    
  } catch (error) {
    console.log(`${error}: ${dateInput} is not a valid date.`);    
    response.json({error: "Invalid Date"}); // send response
  }
  
}
// router definition
router.get("/:date?", processDate);

module.exports = router; 

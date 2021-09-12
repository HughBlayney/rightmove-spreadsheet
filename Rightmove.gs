function getRightMoveData(url) {

  // Fetch site content
  var websiteContent = UrlFetchApp.fetch(url).getContentText();

  // We'll extract everything we need with a mix of regex
  // and json dict parsing, using the latter where possible.

  // Read property data into json dict
  var dictRegExp = new RegExp(/(?<=(window.PAGE_MODEL = )).+/);
  var dictMatchText = websiteContent.match(dictRegExp);
  var propertyDict = JSON.parse(dictMatchText[0]);

  // Get property name
  var titleRegExp = new RegExp(/(?<=(<title>)).+(?=(<\/title>))/);
  var titlesMatchText = websiteContent.match(titleRegExp);
  var title = titlesMatchText[0];
  Logger.log('title: ' + title);

  // Get price
  var price = propertyDict["propertyData"]["prices"]["primaryPrice"];
  Logger.log('price: ' + price);

  // Get num bedrooms
  var numBedrooms = propertyDict["propertyData"]["bedrooms"]
  Logger.log('numBedrooms: ' + numBedrooms);

  // Get num bathrooms
  var numBathrooms = propertyDict["propertyData"]["bathrooms"]
  Logger.log('numBathrooms: ' + numBathrooms);

  // Property Type
  var typeRegExp = new RegExp(/(?<=({"title":"PROPERTY TYPE","type":"PROPERTY_TYPE","primaryText":"))[^,"]+/, "i");
  var typeMatchText = websiteContent.match(typeRegExp);
  var propertyType = typeMatchText[0];
  Logger.log('propertyType: ' + propertyType);

  // Address
  var propertyAddress = propertyDict["propertyData"]["address"]["displayAddress"];
  Logger.log('propertyAddress: ' + propertyAddress);
  
  // Available from
  var propertyAvailable = propertyDict["propertyData"]["lettings"]["letAvailableDate"];
  Logger.log('propertyAvailable: ' + propertyAvailable);

  // Added
  var propertyAdded = propertyDict["analyticsInfo"]["analyticsProperty"]["added"];
  propertyAdded = propertyAdded.slice(6, 8) + "/" + propertyAdded.slice(4,6) + "/" + propertyAdded.slice(0,4);
  Logger.log('propertyAdded: ' + propertyAdded);

  // Furnished
  var propertyFurnished = propertyDict["analyticsInfo"]["analyticsProperty"]["furnishedType"];
  Logger.log('propertyFurnishedType: ' + propertyFurnished);

  // Nearest Station
  var nearestStationData = propertyDict["propertyData"]["nearestStations"][0];
  var nearestStationString = nearestStationData["name"] + " (" + nearestStationData["distance"].toFixed(2) + " " + nearestStationData["unit"] + ")";
  Logger.log('propertyFurnishedType: ' + propertyFurnished);

  var viewed = "No"

  return [
    title,
    price,
    numBedrooms,
    numBathrooms,
    propertyType,
    propertyAddress,
    propertyAvailable,
    propertyAdded,
    propertyFurnished,
    nearestStationString,
    viewed
  ];
}

function atEdit(e) {
  var range = e.range;
  var column = range.getColumn();
  var row = range.getRow();
  if (column == 1 && row > 1) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    var url = sheet.getRange(row, column).getValue();

    var propertyData = getRightMoveData(url);

    for (var i=0; i < propertyData.length; i++){
      var cell = sheet.getRange(row,column+i+1);
      cell.setValue(propertyData[i]);
    }
  }
}


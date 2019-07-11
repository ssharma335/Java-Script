// from data.js
var tableData = data;
// console.log(tableData);

// YOUR CODE HERE!
var button = d3.select("#filter-btn");
var inputField1 = d3.select("#datetime");
var inputField2 = d3.select("#city");
var inputField3= d3.select("#state");
var inputField4 = d3.select("#country");
var inputField5 = d3.select("#shape");
var tbody = d3.select("tbody");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]
// console.log(columns);

var populate = (tableData) => {

    tableData.forEach(ufo_sightings => {
      var row = tbody.append("tr");
      columns.forEach(column => row.append("td").text(ufo_sightings[column])
      )
    });
  }
  
  //Populate table
  populate(data);
  
  // Filter by attribute
  button.on("click", () => {
    d3.event.preventDefault();
    var inputDate = inputField1.property("value").trim();
    var inputCity = inputField2.property("value").trim();
    var inputState = inputField3.property("value").trim();
    var inputCountry = inputField4.property("value").trim();
    var inputShape = inputField5.property("value").trim();

    // Filter by field matching input value
    var filterDate = data.filter(data => data.datetime === inputDate);
    console.log(filterDate)
    var filterCity = data.filter(data => data.city === inputCity);
    console.log(filterCity)
    var filterState = data.filter(data => data.state === inputState);
    console.log(filterState)
    var filterCountry = data.filter(data => data.country === inputCountry);
    console.log(filterCountry)
    var filterShape = data.filter(data => data.shape === inputShape);
    console.log(filterShape)
    var filterData = data.filter(data => data.datetime === inputDate && (data => data.city === inputCity) && (data => data.state === inputState) && (data => data.country === inputCountry) && (data => data.shape === inputShape));
    console.log(filterData)

    // Add filtered sighting to table
    tbody.html("");
  
    let response = {
      filterDate, filterCity, filterState, filterCountry, filterShape, filterData
    }
  
    if (response.filterDate.length !== 0) {
      populate(filterDate);
    }
    
    else if (response.filterData.length === 0 && (response.filterCity.length !== 0 || response.filterDate.length !== 0 || response.filterState.length !== 0 || response.filterCountry.length !== 0 || response.filterShape.length !== 0))
    {
        populate(filterCity) || populate(filterDate) || populate(filterState) || populate(filterCountry) || populate(filterShape);
    }
    else {
        tbody.append("tr").append("td").text("Results not found!"); 
      }
  })

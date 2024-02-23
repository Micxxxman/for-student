

export function PH_data(data){

// Get the element by its ID
var divElement = document.getElementById("myDiv");

// Set the data-score variable
var dataScore = data;

// Set the data-score attribute of the element
divElement.setAttribute("data-score", dataScore);
}
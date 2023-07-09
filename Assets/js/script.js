// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

//Step 1 : Show current time -Done

//All code needs to be wrapped into the function below. This is important  $(document).ready() function / $(function() {...}) is used to ensure that your JavaScript/jQuery code runs only after the document (HTML) has finished loading.
$(function () {

////////////////////////////////////TIME FUNCTIONS////////////////////////////////
var now; //made the variable now globally avaibale in the main function
var currentTime;
var currentDay;
var currentHour;
// Function to update the current day and time
function updateDate() { 
  //Add current time and date from the browser. And shows it in the browser
    console.log(now); //this will show the new function being ran every second
  // Get the current day in the format "Day, Month Date, Year"
  currentDay = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  $('#currentDay').text(currentDay);
};

  function updateTime() { 
    currentHour = now.getHours();
    console.log("Current hour is " + currentHour); //get hour in 24 hour format. it will be easier to parse and compare in the timeblock function
    currentTime = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Get the current time in the format "HH:MM:SS AM/PM"
  
 // console.log(currentTime); //debug
 // console.log("f-updatetime "+currentHour) //debug
  $('#currentTime').text(currentTime);
};



function timeblockcolors() {
  console.log("block current time "+currentHour);
   // Iterate over each time-block element
  $('.time-block').each(function() {
    var timeBlock = $(this);

    // Parse the time value from the time-block element using the class hour
    var time = timeBlock.find('.hour').text().trim();
    var [hours, minutes] = time.split(':'); //split the 24 hours blocks in hours and minutes for better precision, if needed for the future.
    // console.log ("block"+ hours); //debug if blocks are being scanned properly
    // Compare the parsed time with the current time
    if (hours < currentHour) {
      timeBlock.removeClass('future').removeClass('present').addClass('past');
    } else if (hours == currentHour) {
      timeBlock.removeClass('past').removeClass('future').addClass('present');
    } else {
      timeBlock.removeClass('past').removeClass('present').addClass('future');
    }   
})};





function updateDateTime() { //I added one function to run both, to have better flexibility, kind of a modular approach.
  now = new Date();
  updateDate();
  updateTime();
  timeblockcolors();
  };

updateDateTime ();
setInterval(updateDateTime, 1000);//just updating the time, so we don't automatically refresh the date everytime. 


  
  
  
  
  
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

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
var block;
var blockId;
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


//////////////////////////////////BLOCK COLORING/////////////////////////////
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

///////////////////////RUN UPDATE FOR TIME AND BLOCK COLORING/TEXT////////////////////
function updateDateTime() { //I added one function to run both, to have better flexibility, kind of a modular approach.
  now = new Date();
  updateDate();
  updateTime();
  timeblockcolors();
   };

updateDateTime ();
setInterval(updateDateTime, 1000);//just updating the time, so we don't automatically refresh the date everytime. 
readlocalstorage();

////////////////////////////////BUTTON SECTION//////////////////////////////////////
 
///EVENT LISTENER FOR BUTTON BEING CLICKED
$(function buttons () {
  // Find all the buttons within the time-blocks
  var buttons = $('.time-block .btn'); 
  // Add a click event listener for each button
  buttons.click(function() {
    // Get the specific block associated with the clicked button
    block = $(this).closest('.time-block'); 
    
    // Code to execute when a button is clicked
    console.log("Button clicked in block:", block.attr('id'));
    savetext();
    });
});

function savetext() {
    console.log ("Text saved in block "+block.attr('id'));
    blockId = block.attr('id');
    var textarea = block.find('textarea');
    var text = textarea.val();
    localStorage.setItem(blockId, text);
}; 
  
function readlocalstorage() {
  $('.time-block').each(function () {
    var textareaValue = localStorage.getItem($(this).attr('id'));

    var textarea = $(this).children('textarea');

    textarea.val(textareaValue);
  })
};  

});

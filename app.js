var CPS = 0, numChar = 0, flag = 0;
var charArray; // Holds characters and number of times pressed
var startTime, endTime, numChar = -1;

$(document).ready(function(){

    $(document).on("keypress", function(){
        if (flag == 0){
            numChar++;
            flag = 1;
            create2DArray();
            start(); // temporary variable name for Kensal's time function
        }
        else {
        	calcCPS();
        }
    });

});

// Functions

// Create a n-dimensional 
function create2DArray() {

  charArray = new Array(101);

  // Initialize every index 
  for (var i = 0; i < charArray.length; i++) {
    charArray[i] = new Array(2);
    charArray[i][1] = 0; // Initialize all numOfTimes to 0
  }

}

function calcCPS() {

    let timeElapsed = getTimeElapsed(); //this function gets the amount of time passed since startTimer has been called
    numChar++;
    document.getElementById("cpsPar").innerHTML = ("CPS = " + (numChar / timeElapsed));
    return numChar / timeElapsed;

}

function start() {
	startTime = performance.now();
}

function getTimeElapsed() {
  endTime = performance.now();
  var timeDiff = endTime - startTime; //in ms 
  // strip the ms 
  timeDiff /= 1000; 
  
  // get seconds 
  var seconds = Math.round(timeDiff);
  return seconds;
}
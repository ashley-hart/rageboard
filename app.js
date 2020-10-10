var CPS = 0, numChar = 0, flag = 0;
var charNumArray = []; // This array will hold 
var charArray = [];

$(document).ready(function(){

    $(document).on("keypress", function(){
        if (flag == 0){
            numChar++;
            flag = 1;
            start(); // temporary variable name for Kensal's time function
        }
        else {
        	calcCPS();
        }
    });

});

var startTime, endTime;

// Functions

function calcCPS() {

    let timeElapsed = getTimeElapsed(); //this function gets the amount of time passed since startTimer has been called
    numChar++;

    alert("CPS = " + (numChar / timeElapsed));
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
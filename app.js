var CPS = 0, numChar = 0, flag = 0;
var charNumArray = []; // This array will hold 
var charArray = [];

$(document).ready(function(){

    $(document).on("keypress", function(){
        if (flag == 0){
            numChar++;
<<<<<<< HEAD
            console.log("hello");
            startTimer(); // temporary variable name for Kensal's time function
        }
        else{
            CPS = calcCPS();
            $(document).keypress(function(event){
                alert(String.fromCharCode(event.which)); 
            });
=======
            flag = 1;
            start(); // temporary variable name for Kensal's time function
        }
        else {
        	calcCPS();
>>>>>>> 0bd313c2a7fe7597814ce10b0db2d984af0f0d1c
        }
    });

});
<<<<<<< HEAD
=======

var startTime, endTime;
>>>>>>> 0bd313c2a7fe7597814ce10b0db2d984af0f0d1c

// Functions

function calcCPS() {

    let timeElapsed = getTimeElapsed(); //this function gets the amount of time passed since startTimer has been called
    numChar++;

    alert("CPS = " + (numChar / timeElapsed));
    return numChar / timeElapsed;

}

<<<<<<< HEAD
function heatData(){



=======
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
>>>>>>> 0bd313c2a7fe7597814ce10b0db2d984af0f0d1c
}
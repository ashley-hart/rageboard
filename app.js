var CPS = 0, points = 0, numChar = 0, flag = 0;
var charArray; // Holds characters and number of times pressed
var startTime, endTime, numChar = -1;

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
            create2DArray();
            start(); // temporary variable name for Kensal's time function
        }
        else {
<<<<<<< HEAD
        	calcCPS();
>>>>>>> 0bd313c2a7fe7597814ce10b0db2d984af0f0d1c
=======
        	CPS = calcCPS();
          document.getElementById("cpsPar").innerHTML = ("CPS = " + CPS);
          if (CPS < 1000) {
            points += Math.round(CPS / 10);
            document.getElementById("ptsPar").innerHTML = ("Points = " + points);
          }
>>>>>>> 6a4b8496bfc0a02c88e088580e10b96dd0e49837
        }
    });

});
<<<<<<< HEAD
=======

<<<<<<< HEAD
var startTime, endTime;
>>>>>>> 0bd313c2a7fe7597814ce10b0db2d984af0f0d1c

=======
>>>>>>> 6a4b8496bfc0a02c88e088580e10b96dd0e49837
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
    if (numChar / timeElapsed < 0.1)
      return 0.1
    else
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
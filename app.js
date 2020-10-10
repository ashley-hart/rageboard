var CPS = 0, points = 0, numChar = 0, flag = false, length = 0;
var flag2 = false;
var charArray; // Holds characters and number of times pressed
var startTime, endTime, numChar = -1;
var key;



$(document).ready(function(){

    $(document).on("keypress", function(){
        if (flag == false){
            numChar++;
            flag = true;
            create2DArray();
            start(); // temporary variable name for Kensal's time function
        }
        else {
          CPS = calcCPS();
          document.getElementById("cpsPar").innerHTML = ("CPS = " + CPS);
          if (CPS < 1000) {
            points += Math.round(CPS / 10);
            document.getElementById("ptsPar").innerHTML = ("Points = " + points);
          }
          
          key = event.key || event.keyCode;
          updateHeatData(key);

          console.log("Current heat data array");
          for(var i = 0; i < charArray.length; i++){
              console.log("[" + charArray[i][0] + "," + charArray[i][1] + "]");
          }
        }
    });

});

// Functions

// Create a n-dimensional 
function create2DArray() {

  charArray = [];

}

function calcCPS() {

    let timeElapsed = getTimeElapsed(); //this function gets the amount of time passed since startTimer has been called
    numChar++;
    if (numChar / timeElapsed < 0.1)
      return 0.1
    else
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

function updateHeatData(key){

    // for(var i = 0; i < charArray.length; i++){
    //     if(charArray[i][0] == key){
    //         charArray[i][1]++;
    //         flag = true;
    //         break;
    //     }
    // }
    
    //if(flag == false){
        charArray[charArray.length] = [key, 1];
    //}
    //flag = false;

}

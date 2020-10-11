var CPM = 0, points = 0, numChar = 0, flag = false, length = 0;
var flag2 = false;
var charArray, charNumArray, condensedCharArray;
var startTime, endTime, numChar = -1;
var key, offset = 0;



$(document).ready(function(){

    $(document).on("keypress", function(){
        if (flag == false){
            numChar++;
            flag = true;
            create2DArray();
            start(); // temporary variable name for Kensal's time function
        }
        else {
          CPM = Math.round(calcCPM());
          document.getElementById("cpmPar").innerHTML = ("CPM = " + CPM);
          if (CPM < 10000) {
            points += Math.round(CPM / 10);
            document.getElementById("ptsPar").innerHTML = ("Points = " + points);
          }
          
          key = event.key || event.keyCode;
          charArray.push(key);

          console.log("Current heat data array");
          console.log(charArray);
        }

        changeBG();
        
    });

    setInterval(function(){
        CPM = calcCPM();
        if(isNaN(CPM)){
            CPM = 0;
        }
        document.getElementById("cpmPar").innerHTML = ("CPM = " + CPM);
    }, 1000);
    

    $(".sign").click(function() {

        charArray.sort();
        console.log("sorted array:" + charArray);
        for(var i = 0; i < charArray.length; i++){
            var total = 0;
            var current = charArray[i];
            condensedCharArray.push(current);
            for(var j = i; j < charArray.length; j++){
                if(charArray[j] == charArray[i]){
                    total++;
                }
            }
            while(charArray[i] == current){
                i++;
            }
            charNumArray.push(total);
        }
        console.log(condensedCharArray);
        console.log(charNumArray);

    });

});

// Functions

// Create a n-dimensional 
function create2DArray() {

  charArray = [];
  charNumArray = [];
  condensedCharArray = [];

}


function calcCPM() {

    let retval;
    let timeElapsed = getTimeElapsed() / 60; //this function gets the amount of time passed since startTimer has been called
    numChar++;
    if (numChar / timeElapsed < 0.1)
      return 0.1
    else
      retval = Math.round(numChar / timeElapsed);
      return retval;

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

function changeBG(){

    if (CPM < 10000)
      offset += CPM / 1000;

    if(offset <= 100){
        $('body').css("background-position", offset + "%");
    }
    
}
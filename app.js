var CPS = 0, numChar = 0;
var charNumArray = []; // This array will hold 
 charArray = [];

$(document).ready(function(){

    $(document).on("keypress", function(){
        if (CPS == 0){
            numChar++;
            startTimer(); // temporary variable name for Kensal's time function
        }
        else{
            CPS = calcCPS();
            
        }
    })

})

// Functions

function calcCPS(){

    let timeElapsed = getTimeElapsed(); //this function gets the amount of time passed since startTimer has been called
    numChar++;

    return numChar / timeElapsed;

}
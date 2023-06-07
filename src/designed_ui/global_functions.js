import {globalInfo} from './global_Info.js';
import{insertPush,popupElementsObject} from './pushExample/functions';


//takes a string and injects it into the API status after 2 seconds
function APILogBuffer(log){
    //after 10s, return the string (log)
    setTimeout( () => globalInfo.APIStatus.innerHTML =  log,2000);
}


//fetch all submission data into an array from the API
function fetchSubmissionResponses(){
    window.JF.getFormSubmissions(globalInfo.formID, function(response){
        //add all responses to globalInfo so accesible globally
        globalInfo.submissionResponses = response;
    });
}


//get form data function and store into globeInfo
function getFormData() {

    APILogBuffer('getting form data');
    
    //make request to API to recieve push notification
    window.JF.getFormSubmissions(globalInfo.formID, function(response){
        console.log(' date of recieved fetch ' + new Date);
        APILogBuffer('recieved form submission data');
        console.log(globalInfo)
        
        //if delete submissions script has been ran
        //which means the stored submissionsResponses length will be greater than the API response
        //reset all necessary values, as if the script hasn't been ran yet
        //response.length === 1 && globalInfo.submissionResponses.length > 1
        //TODO: fix: globalInfo.submissionResponses.length > 1 && response.length < globalInfo.submissionResponses.length
        if(response.length === 1 && globalInfo.submissionResponses.length > 1 ){
            // assign reponse to globalInfo appriate value
            globalInfo.submissionResponses = response; 
            //reverse submissionResponse so the latest push is always at the end of the array
            globalInfo.submissionResponses.reverse();  
            //reset the arrayIndex, so it starts pulling from the start of the new responses
            globalInfo.submissionResponseArrayIndex = false;

            console.log('array index has been reset')
        }
        //if there are form submissions, store the submissions in global info as appropriate values
        else if(response.length >= 1){
            // assign reponse to globalInfo appriate value
            globalInfo.submissionResponses = response; 
            //reverse submissionResponse so the latest push is always at the end of the array
            globalInfo.submissionResponses.reverse();  
        }
        //if no form submisions yet, update status log with relevant info & enable "stop searching btn"
        else{
            APILogBuffer('no responses recieved yet');
            console.log(globalInfo);
            globalInfo.buttonStop.classList.remove('disabled-btn');
        }

    });
}


//trigger the setInterval to check for form push data
var checkForFormPushData = '';
function triggerFormPushDataSearch(){

    //check every second for a new post
    checkForFormPushData = setInterval( () => {

        //get form data responses
        getFormData();
        console.log('date of init fetch' + new Date)
        //if this is the first time push is being activated
        if(globalInfo.submissionResponseArrayIndex === false && globalInfo.submissionResponses != ''){
            //assign push response to variable
            var pushResponse = globalInfo.submissionResponses[0].answers[globalInfo.responseAnswerNumber];

            //insert newly recieved push response into push and display push (visa insertPush())
            insertPush(pushResponse.answer);

            //store current response index, so eg submissionResponses[submissionResponseArrayIndex]
            globalInfo.submissionResponseArrayIndex = 0;
  
            //stop interval once push is up
            stopFormApi();
            
            globalInfo.lastSubmissionResponseLength = globalInfo.submissionResponses.length;
        }
        //else if this is not the first time the push has been activated
        //check if the submissionResponseArray has had another push added since last time, via submissionResponseArrayIndex
        //if so, send next push
        else if (globalInfo.submissionResponseArrayIndex >= 0 && globalInfo.submissionResponseArrayIndex < globalInfo.submissionResponses.length-1 && globalInfo.submissionResponses != ''){
            globalInfo.lastSubmissionResponseLength++;
            globalInfo.submissionResponseArrayIndex++;
            
            //pushResponse becomes the answer for the latest submission
            var pushResponse = globalInfo.submissionResponses[globalInfo.submissionResponseArrayIndex].answers[globalInfo.responseAnswerNumber];

            //end push response to insertPush function, which will handle push response to screen
            insertPush(pushResponse.answer);

            //stop interval once push is up
            stopFormApi();
        }
        //else if this is last push in array and that push has already been shown, show stop button
        else if (globalInfo.submissionResponseArrayIndex === globalInfo.submissionResponses.length-1
            && popupElementsObject.popUpContainer.style.visibility != 'visible'){
            console.log(new Date + ' last push statement ran');
            globalInfo.buttonStop.classList.remove('disabled-btn');
            //stopFormApi();
        }
        

    },globalInfo.dataRefreshTime)
}


//stop searching for push data function
function stopFormApi(){
    APILogBuffer('API has stopped');
    clearInterval(checkForFormPushData); // stop interval thats checking for form responses/data
}

//CHECK IF LAST PUSH IS THE LAST IN OF SUBMISSION RESPONSES
function isCurrentPushLastPush(){
    debugger;
    console.log(globalInfo);
    var result = (globalInfo.submissionResponseArrayIndex === globalInfo.submissionResponses.length-1) ? true : false;
    return result;
}
//when user has no more notifcations remaining or none have been sent yet, show "stop searching" btn
//is triggered on events like the "exit button" 
function handleExitOfLastPush(){
    if(isCurrentPushLastPush()){
        debugger;
        globalInfo.buttonStop.classList.remove('disabled-btn');
    }
}



export {APILogBuffer,fetchSubmissionResponses,triggerFormPushDataSearch,checkForFormPushData,handleExitOfLastPush,getFormData}


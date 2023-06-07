import {globalInfo} from '../global_Info.js';

//add classList .disabled-btn
function disableBtn(e){
    e.target.classList.add('disabled-btn');
}

//remove classList .disabled-btn
function enableBtn(e){
    e.target.classList.remove('disabled-btn');
}

//***** 
// ALL FUNCTIONS RELATED TO DISABLING ENABLING BTNS

//check if push is there

//check if push available, if so run handBtnAbility (function that after 3 seconds..)
function triggerHandleBtnAbility(){
    debugger;
    //check that the push/globalInfo and API has been configured
    var checkForExitBtn = setInterval(() => {     
        debugger;       
        console.log('checking if API and pussh is configured');
        if(globalInfo.firstCallHasBeenMade === true && window.JF /*&& globalInfo.submissionResponses != ''*/){
            
            debugger;

            clearInterval(checkForExitBtn);
            //handleBtnAbility();
        }
    }, 200);
}

//BELOW CODE CURRENTLY REDUNDANT
//***************************************************/

var checkSeenNotificationsInterval = '';
function handleBtnAbility(){
debugger;
    //if there are responses
    //TO DO: fix this part
    if(globalInfo.submissionResponses.length > 1){
        // checkSeenNotificationsInterval = setInterval(() => {
            
        // }, 200);
        console.log('response greater than 1');
        handleNoNotificationsRemainding(true);
    }
    //if there are no responses,
    else if(globalInfo.submissionResponses.length < 1 || globalInfo.submissionResponses == '' ){
        handleNoNotificationsRemainding(false);
    }

}

// 1. when no more notifcations are avaialble
var timerToCheckIfNoNotifications = '';
function handleNoNotificationsRemainding(responseType){
    debugger;
    //false = no responses remainding
    //true = responses remainding

    //if no more notifcations, enable "top searching" button
        //to enable the user to stop the API from searching for a notification
    if(responseType === false){
        //stop search enabled
        globalInfo.buttonStop.classList.remove('disabled-btn');
        console.log(globalInfo.buttonStop);
    }

    //if response == true and and push is hidden?
}


//********************************************************** */

//when popup is containing the last notifications
// handleLastNotification(){
//     //
// }


// 1.
//if their are responses
    //setinterval to check for...
    //when responseArrayIndex is one less than submissionResponses (because latter doesnt count from 0)
        //add event listener to exit button which runs handleNoNotificationsRemainding(e)
        //said event listener has remove event listener for when its clicked
//if no responses
    //handleNoNotificationsRemainding(e) //which enables stops button


// - 'start search' clicked !DONE!
//     - 'start search' btn disabled !DONE!
// - check if push aviable !DONE!
// - x clicked (event listener for x)
//    1. - after 3 seconds ie: no more pushes to be shown
//         - if push.style.visisibility == hidden 
//             - "stop search btn" enabled
//                 - if "stop search btn" clicked
//                     - disable stop search
//                     - enable start search
//             - clear this timeout
//             - add string 'no new messages' to push placeholder
            

// - 2. when the exit button is clicked and 3 second code starts
// - if the pop up comes back, destroy the 3 second code
//     - setinterval of 100ms checking if visisibility of popup
//     - if its visisble, destroy 3 second code
//     - otherwise clear this interval once the 3 seconds timeout code has been ran

// 1.
//if their are responses
    //setinterval to check for...
    //when responseArrayIndex is one less than submissionResponses (because latter doesnt count from 0)
        //add event listener to exit button which runs handleNoNotificationsRemainding(e)
        //said event listener has remove event listener for when its clicked
//if no responses
    //handleNoNotificationsRemainding(e) //which enables stops button

// 2. SHOULDNT NEED
//if globalInfo submission responses and globalArrayIndex are default
    //handleNoNotificationsRemainding()
    //TODO: note:handleyes will keep running
//otherwise be on standby to be destroyed by handleYesNotificationsActive 
//NOTE:
//need code to handle if a notification comes in while its searching















export{disableBtn,enableBtn,triggerHandleBtnAbility}
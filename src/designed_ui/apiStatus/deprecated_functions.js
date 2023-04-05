// *************************************************
//OLD CODE

//check if push available, if so run handBtnAbility (function that after 3 seconds..)
function triggerHandleBtnAbility(){
    
    var checkForExitBtn = setInterval(() => {
        if(typeof globalInfo.exitButton === 'object'){
            clearInterval(checkForExitBtn);
            handleBtnAbility();
        }
    }, 200);
}

function handleBtnAbility(){
    globalInfo.exitButton.addEventListener('click',(e) => {
        handleNoNotificationsRemainding(e);
        handleYesNotificationsActive(e);
    });
}

// 1. when no more notifcations are avaialble
var timerToCheckIfNoNotifications = '';
function handleNoNotificationsRemainding(e){
    timerToCheckIfNoNotifications = setTimeout(() =>{
        //stop search enabled
        globalInfo.buttonStop.classList.remove('.disabled-btn');
        clearInterval(timerToCheckIfNoNotifications);
    },3000);
}

// 2. when there are still notifications available
var intervalCheckingExisitingNotifications = '';
function handleYesNotificationsActive(e){
    //check for if notifications still exist every .2s
    intervalCheckingExisitingNotifications = setInterval(()=>{
        if(globalInfo.popUpContainer.visibility === 'hidden'){
            //destroy iteration of handleNoNotificationsRemaining.
            clearTimeout(timerToCheckIfNoNotifications);
            //stop checking for new notifications
            clearInterval(intervalCheckingExisitingNotifications);

        }
    },200);
}


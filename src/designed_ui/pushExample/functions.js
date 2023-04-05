import { globalInfo } from "../global_Info";

//object containing all popup elements and elements associated with it
//its not populated yet as per when first created
//as doing so would call elements that don't exist yet
var popupElementsObject = {
    firstCallHasBeenMade: false,
}

//initalise the popupElementsObject essentially
//NOTE: running this function returns a new iteration of popupElementsObject
function popupElements(){

        //populate object with necessary elements
        popupElementsObject = {
            firstCallHasBeenMade: true,
            popUpContainer: document.createElement('div'),
            popUpText: document.createElement('p'),
            popUpTextWrap: document.createElement('div'),
            exitButton: document.createElement('span'),
            UIContainer: document.querySelectorAll('.ui.container')[6], 
        }

        //add attributes, classes etc to all popupElementsObject elements/values

        popupElementsObject.popUpContainer.classList.add('popup-container');

        popupElementsObject.popUpTextWrap.classList.add('popup-text-wrap');

        popupElementsObject.popUpText.classList.add('popup-text');
        popupElementsObject.popUpText.innerHTML = 'No message yet recieved';
        popupElementsObject.popUpText.setAttribute("contenteditable","true");

        popupElementsObject.exitButton.classList.add('popup-exit-button');
        popupElementsObject.exitButton.innerHTML = 'X'
        

        //set initial styles to all popupElementsObject elements
        popupElementsObject.popUpContainer.style = 
        'display: block; visibility: hidden; width: 100%; height: 170px; background: #884ED5; color: black; z-index: 100; font-family: inherit; justify-content: flex-start; overflow: auto; flex-direction: column; border-radius: 8px;';
        popupElementsObject.popUpTextWrap.style =
        'display: flex; justify-content: center; align-items: center; flex-grow: 1';
        popupElementsObject.popUpText.style = 
        'font-size: 20px; text-align: center; padding: 0px 15px; margin-top: 0px;';
        popupElementsObject.exitButton.style = 
        'margin-right: 10px; margin-top: 5px; font-size: 25px; font-weight: bold; cursor: pointer; text-align: right';
        
        //return popupElementsObject
        return popupElementsObject;
}

//create popup and append (only runs once)
function createAndAppendPopup(pushText){

    //initalise popupElementsObject
    popupElementsObject = popupElements();

    //append pop up container
    popupElementsObject.UIContainer.appendChild(popupElementsObject.popUpContainer);

    //append popup text and exit button
    [popupElementsObject.exitButton,popupElementsObject.popUpTextWrap].forEach( element => {
        popupElementsObject.popUpContainer.appendChild(element);
    });
    popupElementsObject.popUpTextWrap.appendChild(popupElementsObject.popUpText);
}

//globalInfo
//INSERT PUSH FUNCTION
function insertPush(pushText){
    console.log(globalInfo);
    //adjust all styles to display push notifcation (which is currently hidden via css)
    //insert pushText (form response) into the push notifcation text node

    globalInfo.p_pushText.innerHTML = pushText;
    popupElementsObject.popUpContainer.style.display = 'flex';
    popupElementsObject.popUpContainer.style.visibility = 'visible';
    popupElementsObject.popUpText.innerHTML = pushText;

    //whenever popup shows, disabled stop searching
    globalInfo.buttonStop.classList.add('disabled-btn');
}

export {popupElements,createAndAppendPopup,insertPush,popupElementsObject}
    
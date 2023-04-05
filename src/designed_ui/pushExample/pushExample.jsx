import React, {Suspense, useEffect} from 'react';
import {BlockHeader} from '../globalComponents/blockHeader.jsx';
import {popupElements,createAndAppendPopup,insertPush,popupElementsObject} from './functions.js';
import { triggerFormPushDataSearch } from '../global_functions.js';
import{APILogBuffer,fetchSubmissionResponses,handleExitOfLastPush} from '../global_functions';
import './pushExample.css';
import '../index.css'
import { globalInfo } from '../global_Info.js';


function PushExample() {

    //contains state/status information for this component 
    var state={
        title: 'Push Notification Example',
        popupCount: 0
    }

    useEffect(() => { 
            createAndAppendPopup();//create pop up (initally hide it)

            //exit button click - hide push notificaiton and start searching for push data again
            popupElementsObject.exitButton.addEventListener("click", () => {
                console.log(globalInfo);
                debugger;
                triggerFormPushDataSearch(); // start searching  for responses. NOTE this updates the ResponseArrayIndex
                popupElementsObject.popUpContainer.style.visibility = 'hidden';

                handleExitOfLastPush(); // show stop btn on last push 

                APILogBuffer('start search'); //populate API status

                //hide placeholder text in push notification example
                if(state.popupCount < 1) { document.querySelector('.notif-ph').innerHTML = ''; }
                state.popupCount++; //tracks number of times popup has appeared
            })
            
    })
  
    return (
    <>
        <div className="popup ui outer container p-20">
            <BlockHeader title={state.title}/>
            <span class='t-center notif-ph'>No Notification Yet Recieved</span>
        </div>
    </>
    );
  }

  export {PushExample}
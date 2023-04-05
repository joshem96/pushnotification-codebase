import React, {Suspense, useEffect} from 'react';
import {BlockHeader} from '../globalComponents/blockHeader.jsx';
import {globalInfo} from '../global_Info.js';
import {APILogBuffer,triggerFormPushDataSearch,checkForFormPushData,handleExitOfLastPush,getFormData} from '../global_functions.js';
import { disableBtn,enableBtn,triggerHandleBtnAbility} from './functions.js';
import './apiStatus.css';
import '../index.css';


function Apistatus() {

    var state = {
        title: 'API Testing'
    }

    // START SEARCH - checks API constantly for submissions (push notifcations)
    function startSearchingForPushData(e){
        console.log('logging global info from start searching..')
        console.log(globalInfo);

        disableBtn(e); // disable start search btn

        //getFormData(); // check API for more push responses
        //handleExitOfLastPush()  // if no more push notifcations, show "stop searching"

        triggerFormPushDataSearch(); //start searching for form data

        //handleExitOfLastPush()  // if no more push notifcations, show "stop searching"


        APILogBuffer('search for notifcations commenced'); //populate API status

        triggerHandleBtnAbility();
    }

    // STOP SEARCH - stops searching the API 
    //(effectively halting push notifications, for control panel only NOT users)
    function stopSearchingForPushData(e){
        disableBtn(e); //disable stop search btn
        globalInfo.buttonStart.classList.remove('disabled-btn'); //enable start search btn
        clearInterval(checkForFormPushData); //stop searching for form data
        APILogBuffer('search for notifcations ceased.'); //populate API status
        //handleButtonAbility()
    }

    return (
    <>
        <div className="api-status ui outer container p-20">

            <BlockHeader title={state.title}/>

            <p>
                <span className='push-text'><b>Last push notification:</b></span>
                <pre className='pre-inline' style={{overflow: 'hidden'}}>No message yet recieved</pre>
            </p>

            <p>
                <span className='api-status'><b>API Status:</b><pre class='pre-inline'>API Has not been activated yet.</pre></span>
            </p>

            <div class="api-status btn-wrap">
                <button class="api-status btn stop disabled-btn" id="force-stop"
                onClick={(e) => stopSearchingForPushData(e)}>
                Stop searching
                </button>
                <button class="api-status btn btn-secondary start" id="search-data"
                onClick={(e) => {startSearchingForPushData(e)}}>
                Start searching
                </button>
            </div>

        </div>
    </>
    );
  }

  export {Apistatus}
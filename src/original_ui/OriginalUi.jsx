
import { useEffect } from 'react';
import './index.css';

function OriginalUI(){

    useEffect(() => {

        {/* // /////////////////////////////////////
        // LOG USER INFORMATION SCRIP */}

        var infoLogText = document.querySelector('.log-info')
        var jotformApiScript = document.querySelector('#jotform-api-script');
        var jotformApiInit = document.querySelector('#jotform-api-init')

        var body = document.querySelector('body')

        //FUNCTIONS>JS
        //..............................

        var apiScriptSrc; //used to retrieve API URL prior to removing from DOM

        //delete script tag with jotform API URL
        function deletePreviousAPIScript(APIscript){
            apiScriptSrc = jotformApiScript.src
            body.removeChild(APIscript)
        }

        //reinject the jotform URL inside a new script tag
        function reinjectAPIScript(APIScript){
            //debugger;
            APIScript = document.createElement('script'); //create new script
            APIScript.src = apiScriptSrc
            body.appendChild(APIScript) 

            jotformApiScript = APIScript; //assign API script variable to be new script variable
        }

        //initialise the script
        function initScript(API){
            API.initialize( {apiKey: "f78958f78beefa5e3e88255e7559579b"} ); 

        }

        //....................................

        function logUserInfo(){

            //NOTE: for whatever reason, to get a fresh usage log the jotform API script needs to be reinserted on the page.
            //otherwise window.JF.getUsage will spit out the same response as when the script was first ran

            //deletePreviousAPIScript(jotformApiScript); //delete previous jotform script

                // !note! this is currently not working, seems to be a bug
            //reinjectAPIScript(jotformApiScript); //reinject previous jotform script

            //initScript(window.JF); //initialise jotform script

            //inject log onto the page
            window.JF.getUsage(function(response){
                //console.log(response);
                infoLogText.innerHTML = JSON.stringify(response,null,2)
                //onsole.log(JSON.stringify(response,null,2))
            });

        }


        document.querySelector('#get-user-info-btn').addEventListener('click', () => {
            logUserInfo();
        });

    // END USER INFORMATION SCRIPT 


    // /////////////////////////////////////
    // DELETE ALL SUBMISSIONS CODE BELOW


        document.querySelector('#delete-submissions-btn').addEventListener('click', () => {
            deleteAllPushSubmissions();
        });
        
        function deleteAllPushSubmissions(){
            
            //DELTE ALL SUBMISSIONS
            //************************************************

            //global variables
            //-----------------

            //ENTER API KEY
            var apiKey = "f78958f78beefa5e3e88255e7559579b"

            //ENTER FORM ID (of form you want to delete submissions for)
            var formID = '221101537081038'


            //************************************************

            //fetch all submissions and then all delete submissions
            //-----------------

            //takes a string and injects it into the API status after 2 seconds
            function APILogBuffer(log){
                //after 10s, return the string (log)
                setTimeout( () => {
                    APIStatus.innerHTML =  ''+ log;
                },2000)
            }

            var submissionResponses = '' //becomes array of all submission responses

            //fetch all submission data into an array from the API
            function fetchSubmissionResponses(){

                window.JF.getFormSubmissions(formID, function(response){
                    console.log('recieved form submission data')

                    submissionResponses = response;

                })
            }

            //DELETE ALL SUBMISSIONS
            function deleteSubmissionResponses(){
            //forEach form submission response, delete the data
            //after this has been run, it will be as if a new form was created (no data)

                debugger;
                for(var i = 0; i < submissionResponses.length; i++){
                debugger;
                    //via the id, for each response delete the response submission
                    window.JF.deleteSubmission(submissionResponses[i].id, function(response){
                    debugger;
                        /**
                         successful response including a text message
                        .
                        */
                        console.log(` ${response}`);
                    })
                    //console.log(submissionResponses[i].id);

                }

            }

            //when API has loaded (window.JF != ''), run the following scripts to execute the deletion of all form submissions
            var whenAPILoaded = '';
            whenAPILoaded = setInterval( () => {
                if(window.JF != ''){

                    //fetch submission responses
                    fetchSubmissionResponses();

                    //when API has retieved submission responses, run delete submission responses function
                    var checkSubmissionsResponse = '';
                    checkSubmissionsResponse = setInterval ( () => {
                        if(submissionResponses != '') {
                            deleteSubmissionResponses() 
                            clearInterval(checkSubmissionsResponse);
                        }
                    },100)

                }

                clearInterval(whenAPILoaded);
                console.log('delete from submissions script has been ran');
                APILogBuffer(' delete all submissions script has been ran')
            },500)
        

        
        }
        
        // Search for push messages and execute pop ups etc

        // get all form responss
        var submissionResponses  = ''
        //get text response
        var p_pushText = document.querySelector('.push-text');
        var APIStatus = document.querySelector('.api-status');
        //number array text lives in
        var responseAnswerNumber = 4;
        //variale that is the current form submission index. eg [1] would be the second post
        //False is init
        var submissionResponseArrayIndex = false;
        //amount of time between each form data check
        var dataRefreshTime = 1000;
        //previous responses array
        var lastSubmissionResponseLength  = '';
        //api key

        //form ID number
        var formID = '221101537081038'

        //takes a string and injects it into the API status after 2 seconds
        function APILogBuffer(log){
            //after 10s, return the string (log)
            setTimeout( () => {
                APIStatus.innerHTML =  ' '+ log;
            },2000)
        }

        //get form data function
        function getFormData() {
            debugger;
            console.log('getting form data')
            APILogBuffer('getting form data')
            
            //make request to API to recieve push notification
            window.JF.getFormSubmissions(formID, function(response){
                debugger;
                console.log('recieved form submission data')
                APILogBuffer('recieved form submission data')
                
                //if there are form submissions, store the submissions in the applicable variables
                if(response.length >= 1){
                    submissionResponses = response;
                    //reverse submissionResponse so the latest push is always at the end of the array
                    submissionResponses.reverse();  
                }else{
                    console.log('no responses recieved yet')
                    APILogBuffer('no responses recieved yet')
                }

            })

        }

        

        //trigger the setInterval to check for form push data
        var checkForFormPushData = '';
        function triggerFormPushDataSearch(){
            debugger;
            //check every second for a new post
            checkForFormPushData = setInterval( () => {
                debugger;
                getFormData();
                //if this is the first time push is being activated
                if(submissionResponseArrayIndex === false && submissionResponses != ''){
                    var pushResponse = submissionResponses[0].answers[responseAnswerNumber];
                    console.log('the new submission is' +submissionResponses)
                    //end push response to insertPush function, which will handle push response to screen
                    insertPush(pushResponse.answer)
                    //store current response index, so eg submissionResponses[submissionResponseArrayIndex]
                    submissionResponseArrayIndex = 0;

                    //stop interval once push is up
                    stopFormApi()
                    
                    lastSubmissionResponseLength = submissionResponses.length;
                }
                //else if this is not the first time the push has been activated
                //check if the submissionResponseArray has had another push added since last time, via submissionResponseArrayIndex
                //if so, send next push
                else if (submissionResponseArrayIndex >= 0 && /* submissionResponseArrayIndex <= submissionResponses.length &&*/ submissionResponseArrayIndex < submissionResponses.length-1 && submissionResponses != ''){
                    lastSubmissionResponseLength++;
                    submissionResponseArrayIndex++;
                    console.log('number of data in index is ' + submissionResponseArrayIndex + ' and data in actual array is' + submissionResponses.length)
                    
                    //pushResponse becomes the answer for the latest submission
                    var pushResponse = submissionResponses[submissionResponseArrayIndex].answers[responseAnswerNumber];

                        //end push response to insertPush function, which will handle push response to screen
                    insertPush(pushResponse.answer);

                    //stop interval once push is up
                    stopFormApi()
                }

            },dataRefreshTime)
        }

        //stop searching for push data function
        function stopFormApi(){

        /* setTimeout( () => { */
                console.log('API has stopped');
                APILogBuffer('API has stopped');
                clearInterval(checkForFormPushData);
        /* },5000) */

        }


        //*********************************************************************************

        //CREATE ELEMENT FUNCTION
        var popUpContainer = '';
        var popUpText = '';
        var popUpTextWrap = '';
        var exitButton = ''
        function createAndAppendPopup(pushText){
            debugger;
            //create HTML elements (div wrapper and p text)
            popUpContainer = document.createElement('div');
            popUpContainer.classList.add('popup-container');
            popUpTextWrap = document.createElement('div');
            popUpTextWrap.classList.add('popup-text-wrap');
            popUpText = document.createElement('p');
            popUpText.classList.add('popup-text');
            popUpText.innerHTML = 'placeholder';
            exitButton = document.createElement('span');
            exitButton.classList.add('popup-exit-button');
            exitButton.innerHTML = 'X'
            

            //set initial styles
            popUpContainer.style = 
            'display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 300px; height: 220px; background: #884ED5; color: black; z-index: 100; font-family: inherit; justify-content: flex-start; overflow: auto; flex-direction: column; border-radius: 8px;';
            popUpTextWrap.style =
            'display: flex; justify-content: center; align-items: center; flex-grow: 1'
            popUpText.style = 
            'font-size: 20px; text-align: center; padding: 0px 15px; margin-top: 0px;';
            exitButton.style = 
            'margin-right: 10px; margin-top: 5px; font-size: 25px; font-weight: bold; cursor: pointer; text-align: right';

            //append pop up container
            document.querySelector('body').appendChild(popUpContainer);

            //append popup text and exit button
            document.querySelector('body').appendChild(popUpContainer);
            [exitButton,popUpTextWrap].forEach( element => {
                popUpContainer.appendChild(element);
            });
            popUpTextWrap.appendChild(popUpText);
        }
        createAndAppendPopup();//create pop up




        //insert push. use P for now
        function insertPush(pushText){
            p_pushText.innerHTML = pushText;
        
        //when push arrives, display push and insert push text
        popUpContainer.style.display = 'flex'
        popUpText.innerHTML = pushText;
        //pushText.innerHTML = pushtext
        }

        //exit button click - hide push notificaiton and start searching for push data aain
        exitButton.addEventListener("click", () => {
            triggerFormPushDataSearch();
        popUpContainer.style.display = 'none';
            console.log('start search')
        APILogBuffer('start search')
        })


        //stop search button
        document.querySelector('#force-stop').addEventListener("click", () => {
            clearInterval(checkForFormPushData)
            console.log('stop search')
            APILogBuffer('stop search')
        })

        //start search button
        document.querySelector('#search-data').addEventListener("click", () => {
            triggerFormPushDataSearch();
            console.log('start search')
            APILogBuffer('start search')
        })

    },[]);

    return(
<>
<div>


   { /* init script below 
    <script id="jotform-api-script" src="https://js.jotform.com/JotForm.js"></script>
    <script id="jotform-api-init" defer>
    window.JF.initialize( {apiKey: "f78958f78beefa5e3e88255e7559579b"} ); 
    </script> 

    // TODO: import these scripts
    <script src="./functions.js">

    </script>*/}

    {/* CONTROL DASHBOARD */}

    <button>
    <a href="javascript:void( window.open( 'https://form.jotform.com/221101537081038', 'blank', 'scrollbars=yes, toolbar=no, width=700, height=500' ) ) "> Send message </a>
    </button>
    
    <button id='delete-submissions-btn'>
    Delete all submissions
    </button>
    
    <button id='get-user-info-btn'>
    log usage info
    </button>
    

    
    <button id="force-stop">
    stop searching
    </button>
    <button id="search-data">
    start searching
    </button>

    <p>
    <b>last push message: </b><span className='push-text'>Placeholder push text</span>
    </p>
    
    <p>
    <b>API status:</b><span className='api-status'></span>
    </p>
    
    <div className='log-wrap'>
    <b>API usage info log:</b><br/><pre className="log-info"></pre>
    </div>

{/*
    <figure className="border-1 i-block">
        <img src="./Usage_Info.png" alt="API log information" style={{width: "700px", maxWidth: "100%"}}/>
        <figcaption className='mv-5' style={{textAlign: "center"}}>What the log results mean</figcaption>
    </figure>
*/}
    

    {/* // END CONTROL DASHBOARD */}
    

       

</div>

</>

);


}
export { OriginalUI }
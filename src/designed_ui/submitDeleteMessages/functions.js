import {globalInfo} from '../global_Info.js';
import{APILogBuffer,fetchSubmissionResponses} from '../global_functions';

function deleteAllPushSubmissions(){

    //DELETE ALL SUBMISSIONS
    function deleteSubmissionResponses(){
    //forEach form submission response, delete the data
    //after this has been run, it will be as if a new form was created (no data)

        //forEach over all form responses (push notifcations)
        for(var i = 0; i < globalInfo.submissionResponses.length; i++){

            //via the id, for each response delete the response submission
            window.JF.deleteSubmission(globalInfo.submissionResponses[i].id, function(response){
                /**
                 successful response including a text message
                .
                */
            })
        }
    }

    //execute delete script (ensure API ok and submissions fetched uptodate)
    function executeDeleteSubmissionResponses(){

        //when API has loaded (window.JF != ''), run the following scripts to execute the deletion of all form submissions
        var whenAPILoaded = '';
        whenAPILoaded = setInterval( () => {

            if(window.JF != ''){
                //fetch submission responses
                fetchSubmissionResponses();

                //when API has retieved submission responses, run delete submission responses function
                var checkSubmissionsResponse = '';
                checkSubmissionsResponse = setInterval ( () => {
                    if(globalInfo.submissionResponses != '') {
                        deleteSubmissionResponses() 
                        clearInterval(checkSubmissionsResponse);
                    }
                },100)
            }

            clearInterval(whenAPILoaded); //stop checking if API has loaded
            APILogBuffer('all submissions have been deleted.'); //populate API status
        },500);
    }
    executeDeleteSubmissionResponses();
}

export{ deleteAllPushSubmissions }
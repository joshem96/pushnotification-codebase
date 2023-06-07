//ph for the global info
//where the 'state/status' of the code is kept
var globalInfo = {
    firstCallHasBeenMade: false,
}

function initglobalInfo(){
    // if this is the first call to the global info object, then initialise it
    if(!globalInfo.firstCallHasBeenMade){
        globalInfo = {
            apiKey: "f78958f78beefa5e3e88255e7559579b" /* API key  */,
            APIStatus: document.querySelectorAll('.api-status pre')[1],
            body: document.querySelector('body'),
            buttonStart: document.querySelector('.btn.start'),
            buttonStop: document.querySelector('.btn.stop'),
            checkForFormPushData: '' /* used as interval to search for data */,
            dataRefreshTime: 1000 /* amount of time between each form data check */,
            firstCallHasBeenMade: true,
            formID: '221101537081038'/* points to the jotform form */,
            jotformApiInit: document.querySelector('#jotform-api-init'),
            jotformApiScript: document.querySelector('#jotform-api-script'),
            lastSubmissionResponseLength: '' /* previous responses array */,
            popUpContainer: '',
            popUpText: '',
            popUpTextWrap: '',
            demoMode: true,
            exitButton: '',
            p_pushText: document.querySelector('.push-text + pre'),
            responseAnswerNumber: 4 /* the number array the answer resides in */,
            submissionResponses: '' /*becomes array of all submission responses*/,
            submissionResponseArrayIndex: false,
            usageLogSrc: 'https://jmwoohah.github.io/Useagelog_Iframe/',
        }
    }

}

export {globalInfo,initglobalInfo}
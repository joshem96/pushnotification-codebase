var jotformApiScript = document.querySelector('#jotform-api-script');
var jotformApiInit = document.querySelector('#jotform-api-init');


var body = document.querySelector('body')
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

 //TODO: FInalise below code in log usage info button 

// deletePreviousAPIScript(jotformApiScript);

// reinjectAPIScript(jotformApiScript);
 
 //initScript(JF)

// JF.getUsage((response) => console.log(response));
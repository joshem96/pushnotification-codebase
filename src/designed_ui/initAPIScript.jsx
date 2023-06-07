{/* <script id="jotform-api-script" src="https://js.jotform.com/JotForm.js"></script>
<script id="jotform-api-init" defer>
JF.initialize( {apiKey: "f78958f78beefa5e3e88255e7559579b"} ); 
</script> */}



function setUpJFAPI(){
    var body = document.querySelector('body');
    var apiScriptSrc = "https://js.jotform.com/JotForm.js"; //used to retrieve API URL prior to removing from DOM
    var APIScript = ''
    
    //reinject the jotform URL inside a new script tag
    function injectAPIScript(){
        //debugger;
        APIScript = document.createElement('script'); //create new script
        APIScript.src = apiScriptSrc
        body.appendChild(APIScript) 
    
        jotformApiScript = APIScript; //assign API script variable to be new script variable
    }
    
    //initialise the script
    function initScript(){
        JF.initialize( {apiKey: "f78958f78beefa5e3e88255e7559579b"} ); 
     }
}




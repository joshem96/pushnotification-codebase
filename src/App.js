import logo from './logo.svg';
import React, {Suspense, useEffect} from 'react';
import{Helmet} from "react-helmet";
import { initglobalInfo } from './designed_ui/global_Info';
import './App.css';
//import {OriginalU} from './original_ui/OriginalUi.jsx';
import {ControlPanelUI} from './designed_ui/uiContainer/ControlPanelUI.jsx';
import {Header} from './designed_ui/Header/Header.jsx';


//const OriginalUI = React.lazy( () => import('./original_ui/OriginalUi.jsx') )

function App() {

  useEffect(() => { 

    function setUpJFAPI(){

      //initialise the script
      function initScript(APIScript){
        APIScript.initialize( {apiKey: "4889f4992570fdf8bec164429d63b190"} ); //old f78958f78beefa5e3e88255e7559579b
      }

      setTimeout( () => {
        try{
          initScript(window.JF); 
        }
        catch(err){
          console.log(`the err is ${err}`)
        }
      },5000);
    }

    //set up the API
    setUpJFAPI();

    //inital the globalInfo object
    initglobalInfo();
    
  })

  return (
  <>
    <Helmet><script id="jotform-api-script" src="https://js.jotform.com/JotForm.js">{}</script></Helmet>
    <Header/>
    <ControlPanelUI/>
  </>
  );
}

export default App;

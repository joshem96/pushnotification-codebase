import React, {Suspense, useEffect} from 'react';
import './ControlPanelUI.css';
import {PushExample} from '../pushExample/pushExample.jsx';
import {UsageLog} from '../usageLog/usageLog.jsx';
import {Apistatus} from '../apiStatus/apiStatus.jsx';
import {SubmitDeleteMessages} from '../submitDeleteMessages/submitDeleteMessages.jsx'

function ControlPanelUI() {
    //returns UI with each component
    return (
    <>
        <div class='container body mw-900'>
            <section class='top row last-push submit status container'>
                {[<SubmitDeleteMessages/>,<Apistatus/>].map((item,i) =>{
                    return <div key={i} className="grow-item ui-block outer container">{item}</div>;
                })}
            </section>

            <section class='bottom row last-push log delete-all'>
                {[<UsageLog/>,<PushExample/>].map((item,i) =>{
                    return <div className="grow-item ui-block outer container" key={i}>{item}</div>
                })}
            </section>
        </div>
    </>
    );
  }

  export {ControlPanelUI}
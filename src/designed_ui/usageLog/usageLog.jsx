import React, {Suspense, useEffect,useState} from 'react';
import {BlockHeader} from '../globalComponents/blockHeader.jsx';
import {globalInfo} from '../global_Info.js';
import './usageLog.css';
import '../index.css';

function UsageLog() {

    //log is inserted as an iframe (theres bugs when using this codes original API)
    //every time the refresh btn is clicked, a ticker is ++
    //this remountsthe component and so updates the log

    var state = {
        title: 'API Usage Log'
    }

    //a simple tick state used to remount the component
    var [count,RerenderThis] = useState(1);

    useEffect(() => { 
        //re-mount the iframe to show the most update log stats
        var iframe = document.querySelector('iframe');
        globalInfo.usageLogSrc = globalInfo.usageLogSrc
        setTimeout( () => iframe.setAttribute('src',globalInfo.usageLogSrc) );
    });
  
    return (
    <>
        <div className="usagelog ui outer container p-20">
            <BlockHeader title={state.title}/>
            
            <div className='log-wrap'>
                <div 
                className="usagelog refresh btn icon"
                onClick={() => { RerenderThis(count+1); console.log('tick')}}>
                </div>
                <iframe></iframe>
            </div>
        </div>
    </>
    );
  }

  export {UsageLog}
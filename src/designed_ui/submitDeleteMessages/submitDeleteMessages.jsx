import React, {Suspense, useEffect} from 'react';
import {BlockHeader} from '../globalComponents/blockHeader.jsx';
import { globalInfo} from '../global_Info.js';
import { deleteAllPushSubmissions } from './functions.js';
import './submitDeleteMessages.css';
import '../index.css'

function SubmitDeleteMessages() {

    //contains state/status information for this component 
    var state = {
        title: 'Manage Live Notifications',
        deleteIcon: '../Assets/delete.png',
        sendIcon: '../Assets/send.png'
    }
  
    return (
    <>
        <div className="submit-delete-messages ui outer container p-20">

            <BlockHeader title={state.title}/>

            <div class="api-status btn-wrap-secondary">

                <div class="submit-delete-messages btn send">
                    <div class='send icon' ></div>
                    {/* old code: 221101537081038 */}
                    <a href="javascript:void( window.open( 'https://www.jotform.com/form/230950934276057', 'blank', 'scrollbars=yes, toolbar=no, width=700, height=500' ) ) ">
                        <span >Send notification</span>
                    </a>
                </div>

                <div class="submit-delete-messages btn delete"
                onClick={deleteAllPushSubmissions}>
                    <div class='delete icon'></div>
                    <span>Delete notifications</span>
                </div>

            </div>

        </div>
    </>
    );
  }

  export {SubmitDeleteMessages}
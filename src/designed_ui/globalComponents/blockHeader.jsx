import React, {Suspense, useEffect} from 'react';
import './blockHeader.css';
import '../index.css';

function BlockHeader(props) {

    useEffect(() => { 

    })
  
    return (
    <>
        <div className="block-header ui container">
            {/* <div>{props.icon}</div> */}
            <h2>{props.title}</h2>
        </div>
    </>
    );
  }

  export {BlockHeader}
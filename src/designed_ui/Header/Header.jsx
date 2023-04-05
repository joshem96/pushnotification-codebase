import React, {Suspense, useEffect,useState} from 'react';
import './Header.css';
import '../index.css';




function Header() {
  
    return (
    <>
        <header>

            <div class='container main-header'>
                <div class="mw-900 parent-container">
                    <h1>Push Notification Control Panel</h1>
                </div>
            </div>

            <div class='container secondary-header'>
                <div class='mw-900'></div>
            </div>

        </header>
    </>
    );
  }

  export {Header}
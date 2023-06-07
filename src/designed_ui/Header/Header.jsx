import React, {Suspense, useEffect,useState} from 'react';
import './Header.css';
import '../index.css';

var readmeLink = `
https://github.com/joshem96/pushnotification-app/blob/main/README.md
`;

function Navlinks(){

    const linksList = [
        {link: readmeLink,linkName:'Readme'}
    ]

    return(
        <>
            <nav>
                <ul>
                    {linksList.map( (listItem,index) => (
                        <li key={index}>
                            <a target="_blank" href={listItem.link}>{listItem.linkName}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}



function Header() {
  
    return (
    <>
        <header>
            {/* grey header */}
            <div class='container main-header'>
                <div class="mw-900 parent-container">
                    <h1>Push Notification Control Panel</h1>
                    <Navlinks/> 
                </div>
            </div>
            {/* purple header  */}
            <div class='container secondary-header'>
                <div class='mw-900'></div>
            </div>

        </header>
    </>
    );
  }

  export {Header}
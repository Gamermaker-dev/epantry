import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import services
import SecurityService from "./services/Security";
import CookieService from './services/Cookie';

function init() {
    window.sessionStorage.clear();
    const securityService = new SecurityService();
    const cookieService = new CookieService();

    

    ReactDOM.render(
        <React.StrictMode>
            <App
                securityService={securityService}
                cookieService={cookieService}
            />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

init();
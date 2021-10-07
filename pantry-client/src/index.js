import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';

// import services
import SecurityService from "./services/Security";
import CookieService from './services/Cookie';
import UserService from './services/User';
import ColorService from './services/Color';

function init() {
    // window.sessionStorage.clear();
    const cookieService = new CookieService();
    const securityService = new SecurityService(cookieService);
    const userService = new UserService();
    const colorService = new ColorService();

    axios.defaults.baseURL = 'http://localhost:8000/api';

    ReactDOM.render(
        <React.StrictMode>
            <App
                securityService={securityService}
                cookieService={cookieService}
                userService={userService}
                colorService={colorService}
            />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

init();
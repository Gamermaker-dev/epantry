import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';

// import services
import SecurityService from "./services/Security";
import CookieService from './services/Cookie';
import ModelService from './services/Model';

function init() {
    // window.sessionStorage.clear();
    const cookieService = new CookieService();
    const securityService = new SecurityService(cookieService);
    const categoryService = new ModelService('categories');
    const colorService = new ModelService('colors');
    const groupService = new ModelService('groups');
    const permissionService = new ModelService('permissions');
    const userService = new ModelService('users');

    axios.defaults.baseURL = 'http://localhost:8000/api';

    ReactDOM.render(
        <React.StrictMode>
            <App
                securityService={securityService}
                cookieService={cookieService}
                categoryService={categoryService}
                colorService={colorService}
                groupService={groupService}
                permissionService={permissionService}
                userService={userService}
            />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

init();
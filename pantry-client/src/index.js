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

    axios.defaults.baseURL = 'http://localhost:8000/api';
    
    // window.sessionStorage.clear();
    const cookieService = new CookieService();
    const userService = new ModelService('users');
    const securityService = new SecurityService(cookieService, userService);
    const categoryService = new ModelService('categories');
    const colorService = new ModelService('colors');
    const conditionService = new ModelService('conditions');
    const genderService = new ModelService('genders');
    const groupService = new ModelService('groups');
    const permissionService = new ModelService('permissions');
    const schoolService = new ModelService('schools');
    const sizeService = new ModelService('sizes');
    const verseService = new ModelService('verses');

    ReactDOM.render(
        <React.StrictMode>
            <App
                securityService={securityService}
                cookieService={cookieService}
                categoryService={categoryService}
                colorService={colorService}
                conditionService={conditionService}
                genderService={genderService}
                groupService={groupService}
                permissionService={permissionService}
                schoolService={schoolService}
                sizeService={sizeService}
                userService={userService}
                verseService={verseService}
            />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

init();
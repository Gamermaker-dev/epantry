import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { toast } from 'bulma-toast';
import './index.css';
import App from './App';

// import services
import SecurityService from "./services/Security";
import ClothesService from './services/Clothes';
import CookieService from './services/Cookie';
import ModelService from './services/Model';

function init() {

    axios.defaults.baseURL = 'http://localhost:8000/api';

    axios.interceptors.response.use(function (response) {
        return Promise.resolve(response);
      }, function (error) {
            const rej = error.response.data;
            const errorMessage = `${rej.errors[0].field}: ${rej.errors[0].message[0]}`
            toast({
                message: errorMessage,
                type: 'is-danger',
                dismissible: true,
                animate: { in: 'fadeIn', out: 'fadeOut' },
            });
        return Promise.reject(error);
      });
    
    // window.sessionStorage.clear();
    const cookieService = new CookieService();
    const userService = new ModelService('User', 'users');
    const securityService = new SecurityService(cookieService, userService);
    const categoryService = new ModelService('Category', 'categories');
    const clothesService = new ClothesService();
    const colorService = new ModelService('Color', 'colors');
    const conditionService = new ModelService('Condition', 'conditions');
    const genderService = new ModelService('Gender', 'genders');
    const groupService = new ModelService('Group', 'groups');
    const permissionService = new ModelService('Permission', 'permissions');
    const schoolService = new ModelService('School', 'schools');
    const sizeService = new ModelService('Size', 'sizes');
    const verseService = new ModelService('Verse', 'verses');

    ReactDOM.render(
        <React.StrictMode>
            <App
                securityService={securityService}
                cookieService={cookieService}
                categoryService={categoryService}
                clothesService={clothesService}
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
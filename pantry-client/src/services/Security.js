import axios from "axios";

export default class SecurityService {
    constructor(cookieService, userService) {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
        this.cookieService = cookieService;

        this.adminLevel = [1];
        this.moderatorLevel = [1, 2];
        this.patronLevel = [1, 2, 3];

        this.isAdmin = false;
        this.isModerator = false;
        this.isPatron = false;

        this.__user = {};

        this.userId = window.localStorage.getItem("user");

        if (this.userId && this.cookieService.getCookie("logged_in")) {
            this.userAuthenticated = true;
            userService.get(parseInt(this.userId))
                .then((user) => {
                    this.user = user;
                    this.userAuthenticated = true;
                    this.isAdmin = this.isUserAuthorized('admin');
                    this.isModerator = this.isUserAuthorized('moderator');
                    this.isPatron = this.isUserAuthorized('patron');
                });
        } else {
            this.userAuthenticated = false;
        }
    }

    get user() {
        return this.__user;
    }

    set user(obj) {
        this.__user = obj;
    }

    login(username, password) {
        return axios.post("/login/", {username: username, password: password})
            .then((res) => {
                this.user = res.data;
                window.localStorage.setItem('user', this.user.id);
                this.userAuthenticated = true;
                this.isAdmin = this.isUserAuthorized('admin');
                this.isModerator = this.isUserAuthorized('moderator');
                this.isPatron = this.isUserAuthorized('patron');
                return Promise.resolve(this.userAuthenticated);
            })
            .catch((err) => { 
                return Promise.reject(err.response.data);
            });
    }

    logout() {
        return axios.post("/logout/", {})
            .then((res) => {
                window.localStorage.removeItem("user");
                this.userAuthenticated = false;
                return Promise.resolve(this.userAuthenticated);
            })
            .catch((err) => {
                return Promise.reject(err.response.data);
            });
    }

    isUserAuthenticated() {
        return this.userAuthenticated;
    }

    isUserAuthorized(permission) {
        let auth = this.user.is_superuser;

        if (permission === 'moderator') {
            auth = this.user.is_staff;
        }

        if (!auth && this.user.groups) {
            this.user.groups.forEach(group => {
                auth = auth ? auth : this[`${permission}Level`].includes(group);                       
            });
        }

        return auth;
    }
}
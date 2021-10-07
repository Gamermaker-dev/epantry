import axios from "axios";

export default class SecurityService {
    constructor(cookieService) {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
        this.cookieService = cookieService;

        if (window.localStorage.getItem("user") && this.cookieService.getCookie("logged_in")) {
            this.userAuthenticated = true;
        } else {
            this.userAuthenticated = false;
        }
    }

    login(username, password) {
        return axios.post("/login/", {username: username, password: password}, {withCredentials: true})
            .then((res) => {
                window.localStorage.setItem('user', res.data.user.id);
                this.userAuthenticated = true;
                return Promise.resolve(this.userAuthenticated);
            })
            .catch((err) => { 
                console.log(err);
                return Promise.resolve(this.userAuthenticated);
            });
    }

    logout() {
        return axios.post("/logout/", {}, {withCredentials: true})
            .then((res) => {
                window.localStorage.removeItem("user");
                this.userAuthenticated = false;
                return Promise.resolve(this.userAuthenticated);
            })
            .catch((err) => {
                console.log(err);
                return Promise.resolve(this.userAuthenticated);
            });
    }

    isUserAuthenticated() {
        return this.userAuthenticated;
    }
}
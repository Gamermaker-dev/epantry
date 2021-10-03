import axios from "axios";

export default class SecurityService {
    constructor() {
        this.userAuthenticted = false;
    }

    login(username, password) {
        axios.post("http://localhost:8000/auth/login/", {username: username, password: password})
            .then((res) => {
                window.sessionStorage.setItem("token", res.data.token);
                this.userAuthenticated = true;
                window.location = 'http://localhost:8000/';
            })
            .catch((err) => { 
                console.log(err);
            });
    }

    logout() {
        window.sessionStorage.removeItem("token");
        window.sessionStorage.removeItem("refresh");
        this.userAuthenticted = false;
    }
}
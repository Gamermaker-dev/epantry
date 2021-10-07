import axios from "axios";

export default class UserService {

    constructor() {
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.update = this.update.bind(this);
    }

    fetchUserInfo(id) {
        return axios.get(`/users/${id}/`, {withCredentials: true})
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
            });
    }

    update(id, username, firstName, lastName, email) {
        const userObj = {
            id: id,
            username: username,
            first_name: firstName,
            last_name: lastName,
            email: email,
        };

        return axios.put(`/users/${id}/`, userObj, {withCredentials: true})
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
            });
    }
}
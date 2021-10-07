import axios from "axios";

export default class ColorService {

    constructor() {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    get(id) {
        const url = id ? `/colors/${id}/` : '/colors/';
        return axios.get(url, {withCredentials: true})
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
            });
    }

    create(newColor) {
        return axios.put('/colors/', newColor, {withCredentials: true})
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
            });
    }

    update(color) {
        return axios.put(`/colors/${color.id}/`, color, {withCredentials: true})
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
            });
    }
    
    delete(id) {
        return axios.delete(`/colors/${id}/`, {withCredentials: true})
            .then((res) => {
                return 'Delete was successful';
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
            })
    }
}
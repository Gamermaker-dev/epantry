import axios from "axios";

export default class ModelService {

    constructor(apiHandler) {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.apiHandler = apiHandler;
    }

    get(id) {
        const url = id ? `/${this.apiHandler}/${id}/` : `/${this.apiHandler}/`;
        return axios.get(url)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
            });
    }

    create(newModel) {
        return axios.post(`/${this.apiHandler}/`, newModel)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
            });
    }

    update(model) {
        return axios.put(`/${this.apiHandler}/${model.id}/`, model)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
            });
    }
    
    delete(id) {
        return axios.delete(`/${this.apiHandler}/${id}/`)
            .then((res) => {
                return 'Delete was successful';
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
            })
    }
}
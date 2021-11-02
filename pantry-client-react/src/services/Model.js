import axios from "axios";
import { toast } from "bulma-toast";

export default class ModelService {

    constructor(modelName, apiHandler) {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.modelName = modelName;
        this.apiHandler = apiHandler;
    }

    get(id) {
        const url = id ? `/${this.apiHandler}/${id}/` : `/${this.apiHandler}/`;
        return axios.get(url)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return Promise.reject(err.response.data);
            });
    }

    create(newModel) {
        return axios.post(`/${this.apiHandler}/`, newModel)
            .then((res) => {
                toast({
                    message: `Successfuly created ${this.modelName}!`,
                    type: 'is-success',
                    dismissible: true,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                });
                return res.data;
            })
            .catch((err) => {
                const rej = err.response.data;
                const errorMessage = `${rej.errors[0].field}: ${rej.errors[0].message[0]}`
                toast({
                    message: errorMessage,
                    type: 'is-danger',
                    dismissible: true,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                });
                return Promise.reject(rej);
            });
    }

    update(model) {
        return axios.put(`/${this.apiHandler}/${model.id}/`, model)
            .then((res) => {
                toast({
                    message: `Successfuly updated ${this.modelName}!`,
                    type: 'is-success',
                    dismissible: true,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                });
                return res.data;
            })
            .catch((err) => {
                const rej = err.response.data;
                const errorMessage = `${rej.errors[0].field}: ${rej.errors[0].message[0]}`
                toast({
                    message: errorMessage,
                    type: 'is-danger',
                    dismissible: true,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                });
                return Promise.reject(err.response.data);
            });
    }
    
    delete(id) {
        return axios.delete(`/${this.apiHandler}/${id}/`)
            .then((res) => {
                toast({
                    message: `Successfuly deleted ${this.modelName}!`,
                    type: 'is-success',
                    dismissible: true,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                });
                return 'Delete was successful';
            })
            .catch((err) => {
                const rej = err.response.data;
                const errorMessage = `${rej.errors[0].field}: ${rej.errors[0].message[0]}`
                toast({
                    message: errorMessage,
                    type: 'is-danger',
                    dismissible: true,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                });
                return Promise.reject(err.response.data);
            })
    }
}
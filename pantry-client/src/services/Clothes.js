import axios from "axios";
import ModelService from "./Model";
import { toast } from "bulma-toast";

export default class ClothesService extends ModelService {
    constructor() {
        super('Clothes', 'clothes');
    }

    import(file) {
        // import records in file
        let formData = new FormData();
        formData.append('import_file', file);
        return axios.post(`/${this.apiHandler}/import/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                return res.data;
            });
    }

    addToCart(id) {

    }

    getCart() {
        return axios.get('/users/cart/')
            .then((res) => {
                return res.data;
            });
    }
}
import ModelService from "./Model";

export default class ClothesService extends ModelService {
    constructor() {
        super('Clothes', 'clothes');
    }

    import(file) {
        // import records in file
    }
}
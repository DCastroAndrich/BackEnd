import mongoose from "mongoose";
import config from "../utils/config.js";

const URL = config.mongodb.url;

await mongoose.connect(URL);


class ContainerMongoDB {
    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema)
    }

    async getAll() {
        try {
            const docs = await this.collection.find({})
            console.log(docs);
            return docs


        } catch (error) {
            this.console.error(error);
        }
    }

    async getById(id) {
        try {
            const doc = await this.collection.find({
                _id: id
            })
            console.log(doc);
            return doc

        } catch (error) {
            this.console.error(error)
        }
    }
    async save(obj) {
        try {
            const newProd = new this.collection.schema(obj)
            let doc = await newProd.save()
            console.log(doc);
            return doc;

        } catch (error) {
            this.console.error(error);
        }
    }

    async update(obj, id) {
        try {
            let result = await this.collection.updateOne({
                _id: id
            }, {
                $set: {
                    ...obj
                }
            })
            console.log(result);
            return result
        } catch (error) {
            this.console.error(error);
        }

    }

    async deleteById(id) {

        try {
            let result = await this.collection.deleteOne({
                _id: id
            })
            console.log(result);
            return result
        } catch (error) {
            this.console.error(error);
        }
    }




}


export default ContainerMongoDB;
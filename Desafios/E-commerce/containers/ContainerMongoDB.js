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
            console.error(error);
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
            console.error(error)
        }
    }

    async newCart() {
        try {
            const newCart = new this.collection()
            let doc = await newCart.save()
            console.log(doc.id);
            return doc.id

        } catch (error) {
            console.error(error);
        }
    }

    async save(obj) {
        try {
            const newObj = new this.collection(obj)
            let doc = await newObj.save()
            console.log(doc);
            return doc;

        } catch (error) {
            console.error(error);
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
            console.error(error);
        }

    }

    async saveToCart(id, id_prod) {

        try {
            let findProduct = await products.find({
                _id: id_prod
            })
            let result = await this.collection.findByIdAndUpdate(id, {
                $set: {
                    ...findProduct
                }
            })

            console.log(result);
            return result


        } catch (error) {
            console.error(error);
        }
    }

    async eraseFromCart(id) {
        try {
            let result = await this.collection.deleteOne({
                _id: id
            })
            console.log(result);
            return result
        } catch (error) {
            console.error(error);
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
            console.error(error);
        }
    }




}


export default ContainerMongoDB;
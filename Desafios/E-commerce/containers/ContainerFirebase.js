import admin from "firebase-admin"
import config from "../utils/config.js"

const serviceAccount = config.firebase.route;

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)

    })
} catch (error) {
    console.error(error);

} finally {
    const db = admin.firestore()
    const query = db.collection(this.collection)

}



class ContainerFirebase {
    constructor(collectionName) {
        this.collection = collectionName
    }
    async initializeApp()

    async getAll() {
        try {
            const querySnapshot = await query.get()
            let docs = querySnapshot.docs;

            const response = docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            return response;

        } catch (error) {
            console.error(error);
        }
    }

    async getById(id) {
        try {
            const doc = query.doc(`${id}`)
            const item = await doc.get()
            const response = item.data()
            return response

        } catch (error) {
            console.error(error);
        }
    }

    async save(obj) {
        try {
            const doc = query.doc()
            await doc.create({
                ...obj
            })
            console.log("Datos insertados");
        } catch (error) {
            console.error(error);
        }
    }

    async update(obj, id) {
        try {
            const doc = query.doc(`${id}`)
            let item = await doc.update({
                ...obj
            });
            console.log("Se actualizo el siguiente elemento", item);
            return item


        } catch (error) {
            console.error(error);

        }
    }


    async deleteById(id) {
        try {
            const doc = query.doc(`${id}`)
            const item = doc.delete()
            console.log("Se ha eliminado el siguiente elemento", item);
            return item

        } catch (error) {
            console.error(error);
        }
    }


}

export default ContainerFirebase;
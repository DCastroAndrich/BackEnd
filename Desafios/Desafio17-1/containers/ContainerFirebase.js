import admin from "firebase-admin";
import config from "../utils/config.js";

const serviceAccount = config.firebase.route;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class ContainerFirebase {
  constructor(collectionName) {
    this.collection = collectionName;
  }

  async getAll() {
    try {
      const db = admin.firestore();
      const query = db.collection(this.collection);
      const querySnapshot = await query.get();
      let docs = querySnapshot.docs;

      const response = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getById(id) {
    try {
      const db = admin.firestore();
      const query = db.collection(this.collection);
      const doc = query.doc(`${id}`);
      const item = await doc.get();
      const response = item.data();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async newCart() {
    try {
      const db = admin.firestore();
      const query = db.collection(this.collection);
      const doc = query.doc();
      await doc.create({
        timestamp: new Date(),
        products: [],
      });
      console.log("Carrito creado", doc.id);
      return doc.id;
    } catch (error) {
      console.error(error);
    }
  }

  async save(obj) {
    try {
      const db = admin.firestore();
      const query = db.collection(this.collection);
      const doc = query.doc();
      await doc.create({
        ...obj,
      });
      console.log("Datos insertados");
    } catch (error) {
      console.error(error);
    }
  }

  async saveToCart(id, id_prod) {
    try {
      const db = admin.firestore();

      const queryProduct = db.collection("products");
      const prods = queryProduct.doc(`${id_prod}`);
      const item = await prods.get();
      const prod = item.data();

      const query = db.collection(this.collection);
      const doc = query.doc(`${id}`);
      await doc.update({
        products: admin.firestore.FieldValue.arrayUnion({ ...prod }),
      });
      console.log("Producto agregado", item);
    } catch (error) {
      console.error(error);
    }
  }

  async update(obj, id) {
    try {
      const db = admin.firestore();
      const query = db.collection(this.collection);
      const doc = query.doc(`${id}`);
      let item = await doc.update({
        ...obj,
      });
      console.log("Se actualizo el siguiente elemento", item);
      return item;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      const db = admin.firestore();
      const query = db.collection(this.collection);
      const doc = query.doc(`${id}`);
      const item = doc.delete();
      console.log("Se ha eliminado el siguiente elemento", item);
      return item;
    } catch (error) {
      console.error(error);
    }
  }
}

export default ContainerFirebase;

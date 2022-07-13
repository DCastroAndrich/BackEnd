import CustomError from "../classes/CustomError.class.js";
import CartDAOFactory from "../classes/CartDAOFactory.class.js";

const DAO = CartDAOFactory.get();

class CartController {
  getAllCarts = async (req, res) => {
    try {
      let docs = await DAO.getAll();
      res.status(200).json(docs);
    } catch (error) {
      throw new CustomError(500, "Error in 'getAllCarts' method", error);
    }
  };

  getCart = async (req, res) => {
    try {
      let doc = await DAO.getById(req.params.id);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'getCart' method", error);
    }
  };

  saveCart = async (req, res) => {
    try {
      let doc = await DAO.save();
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'saveCart' method", error);
    }
  };

  updateCart = async (req, res) => {
    let cartID = req.params.id;
    let prodID = req.params.id_prod;
    try {
      let doc = await DAO.update(cartID, prodID);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'updateCart' method", error);
    }
  };

  deleteCart = async (req, res) => {
    try {
      let doc = await DAO.deleteCartID(req.params.id);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'deleteCart' method", error);
    }
  };

  deleteFromCart = async (req, res) => {
    let cartID = req.params.id;
    let prodID = req.params.id_prod;
    try {
      let doc = await DAO.deleteById(cartID, prodID);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'deleteFromCart' method", error);
    }
  };
}

export default CartController;

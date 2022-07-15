import CustomError from "../classes/CustomError.class.js";
import CartsDAOFactory from "../classes/CartsDAOFactory.class.js";

const DAO = CartsDAOFactory.get();

class CartsController {
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
      let doc = await DAO.save(req.body);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'saveCart' method", error);
    }
  };

  updateCart = async (req, res) => {
    let cartID = req.params.id;
    let prod = req.body;
    try {
      let doc = await DAO.update(cartID, prod);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'updateCart' method", error);
    }
  };

  deleteCart = async (req, res) => {
    let cartID = req.params.id;
    try {
      let doc = await DAO.deleteById(cartID);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'deleteCart' method", error);
    }
  };
}

export default CartsController;

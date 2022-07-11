import CustomError from "../classes/CustomError.class.js";
import ProductsDAOFactory from "../classes/ProductsDAOFactory.class.js";

const DAO = ProductsDAOFactory.get();

class ProductsController {
  getAllProducts = async (req, res) => {
    try {
      const docs = await DAO.getAll();

      res.status(200).json(docs);
    } catch (error) {
      throw new CustomError(500, "Error in 'getAllProducts' method", error);
    }
  };

  getProduct = async (req, res) => {
    try {
      const doc = await DAO.getById(req.params.id);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'getProduct' method", error);
    }
  };

  saveProduct = async (req, res) => {
    try {
      const doc = await DAO.save(req.body);

      res.status(200).json({ ...doc });
    } catch (error) {
      throw new CustomError(500, "Error in 'saveProduct' method", error);
    }
  };

  updateProduct = async (req, res) => {
    const prod = { id: req.params.id, ...req.body };
    try {
      const doc = await DAO.update(prod);
      res.status(200).json({ ...doc });
    } catch (error) {
      throw new CustomError(500, "Error in 'updateProduct' method", error);
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const doc = await DAO.deleteById(req.params.id);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'deletProduct' method", error);
    }
  };
}

export default ProductsController;

import CustomError from "../classes/CustomError.class.js";
import ProductDAOFactory from "../classes/ProductDAOFactory.class.js";

const DAO = ProductDAOFactory.get();

class ProductController {
  getAllProducts = (req, res) => {
    try {
      let docs = DAO.getAll();

      res.status(200).json(docs);
    } catch (error) {
      throw new CustomError(500, "Error in 'getAllProducts' method", error);
    }
  };

  getProduct = (req, res) => {
      try {
          let doc = await DAO.getById(req.params.id);
          res.status(200).json(doc);
      } catch (error) {
        throw new CustomError(500, "Error in 'getProduct' method", error);
      }
  }

  saveProduct = (req, res) => {
      try {
          let doc = await DAO.save(req.body)
          
          res.status(200).json({...doc})
          
      } catch (error) {
        throw new CustomError(500, "Error in 'saveProduct' method", error);
      }
  }

  updateProduct = (req, res) => {
      let prod = {id: req.params.id, ...req.body}
      try {
          let doc = await DAO.update(prod)
          res.status(200).json({...doc})
      } catch (error) {
        throw new CustomError(500, "Error in 'updateProduct' method", error);
          
      }
  }

  deleteProduct = (req, res) => {
    try {
        let doc = await DAO.deleteById(req.params.id)
        res.status(200).json(doc)
    } catch (error) {
        throw new CustomError(500, "Error in 'deletProduct' method", error);
    }
  }
}

export default ProductController

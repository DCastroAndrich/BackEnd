import CustomError from "../classes/CustomError.class.js";
import CartDAOFactory from "../classes/CartDAOFactory.class.js";

const DAO = new CartDAOFactory.get();

class CartController {
    getAllCarts = (req, res)=>{
        try {
            let docs = DAO.getAll();
            res.status(200).json(docs);
            
        } catch (error) {
            throw new CustomError(500, "Error in 'getAllCarts' method", error);
            
        }
    }

    getCart = (req, res)=>{
        try {
            let doc = await DAO.getById(req.params.id);
            res.status(200).json(doc)
            
        } catch (error) {
            throw new CustomError(500, "Error in 'getCart' method", error);
            
        }
    }

    saveCart = (req, res)=>{
        try {
            let doc = await DAO.save()
            res.status(200).json(doc)
        } catch (error) {
            throw new CustomError(500, "Error in 'saveCart' method", error);
            
        }
    }
    updateCart = (req, res)=>{
        try {
            
        } catch (error) {
            
        }
    }


}

export default CartController
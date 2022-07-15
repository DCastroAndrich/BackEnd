import CustomError from "../classes/CustomError.class.js";
import UsersDAOFactory from "../classes/UsersDAOFactory.class.js";

const DAO = UsersDAOFactory.get();

class UsersController {
  getAllUsers = async (req, res) => {
    try {
      const docs = await DAO.getAll();
      res.status(200).json(docs);
    } catch (error) {
      throw new CustomError(500, "Error in 'getAllUsers' method", error);
    }
  };

  getUser = async (req, res) => {
    try {
      const doc = await DAO.getBy(req.params.id);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'getUser' method", error);
    }
  };
  saveUser = async (req, res) => {
    try {
      const doc = await DAO.save(req.body);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'saveUser' method", error);
    }
  };

  deleteUser = async (req, res) => {
    try {
      const doc = await DAO.deleteById(req.params.id);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'deleteUser' method", error);
    }
  };
}

export default UsersController;

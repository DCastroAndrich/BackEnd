import CustomError from "../classes/CustomError.class.js";
import UserDAOFactory from "../classes/UserDAOFactory.class.js";

const DAO = UserDAOFactory.get();

class UserController {
  getAllUsers = async (req, res) => {
    try {
      let docs = await DAO.getAll();

      res.status(200).json(docs);
    } catch (error) {
      throw new CustomError(500, "Error in 'getAllUsers' method", error);
    }
  };

  getUser = async (req, res) => {
    try {
      let doc = await DAO.getById(req.params.username);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'getUser' method", error);
    }
  };

  saveUser = async (req, res) => {
    try {
      let doc = await DAO.save(req.body);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'saveUser' method", error);
    }
  };

  updateUser = async (req, res) => {
    let user = { id: req.params.id, ...req.body };

    try {
      let doc = await DAO.update(user);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'updateUser' method", error);
    }
  };

  deleteUser = async (req, res) => {
    try {
      let doc = await DAO.deleteById(req.params.id);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'deleteUser' method", error);
    }
  };
}

export default UserController;

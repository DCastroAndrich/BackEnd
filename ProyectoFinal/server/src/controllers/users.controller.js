import CustomError from "../classes/CustomError.class.js";
import UsersDAOFactory from "../classes/UsersDAOFactory.class.js";

const DAO = UsersDAOFactory.get();

class UsersController {
  newUser = async (req, res) => {
    const { username } = req.body;
    try {
    } catch (error) {
      throw new CustomError(500, "Error in 'createUser' method", error);
    }
  };
}

import ContainerMongoDB from "../../containers/ContainerMongoDB.js";

class UsersDAOMongoDB extends ContainerMongoDB {
  constructor() {
    super("users", {
      username: {
        type: String,
        required: true,
        max: 150,
      },
      password: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true,
        max: 150,
      },      
      age: {
        type: Number,
      },
      address: {
        type: String,
        max: 400,
      },
      phone: {
        type: Number,
        required: true,
      },
    });
  }
}

export default UsersDAOMongoDB;

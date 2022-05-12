import ContainerMongoDB from "../../ContainerMongoDB.js";

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
      address: {
        type: String,
        max: 400,
      },
      age: {
        type: Number,
      },
      cellphone: {
        type: Number,
        required: true,
      },
    });
  }
}

export default UsersDAOMongoDB;

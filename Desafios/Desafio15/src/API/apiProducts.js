import config from "../../config.js";

import ContainerSQL from "../containers/ContainerSQL.js";

const apiProducts = new ContainerSQL(`${config.mariaDB}`, "products");

export default apiProducts;

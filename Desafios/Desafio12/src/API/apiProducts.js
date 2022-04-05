import config from "../../config";

import ContainerSQL from "../containers/ContainerSQL";

const apiProducts = new ContainerSQL(`${config.mariaDB}`, "products");

export default apiProducts;

import config from "../../config.js";

import ContainerSQL from "../containers/ContainerSQL.js";

const apiMessages = new ContainerSQL(`${config.SQLite}`, "messages");

export default apiMessages;

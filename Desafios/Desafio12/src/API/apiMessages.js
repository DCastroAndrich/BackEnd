import config from "../../config";

import ContainerSQL from "../containers/ContainerSQL";

const apiMessages = new ContainerSQL(`${config.SQLite}`, "messages");

export default apiMessages;

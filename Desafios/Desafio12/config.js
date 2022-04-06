import path from "path";

export default {
  PORT: process.env.PORT || 8282,
  mongo: {
    client: "mongodb",
    url: "mongodb+srv://damian:damian@clusterex11.xtyhv.mongodb.net/Desafio11?retryWrites=true&w=majority",
  },
  mariaDB: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "",
      database: "desafio08",
    },
  },
  SQLite: {
    client: "better-sqlite3",
    connection: { filename: path.join(process.cwd(), "/DB/ecommerce.db3") },
    useNullAsDefault: true,
  },
};

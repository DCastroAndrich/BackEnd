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
      host: "127.0.0.1",
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
  facebookApp: {
    FACEBOOK_APP_ID: "349323757341903",
    FACEBOOK_APP_SECRET: "1b0b5bc5e5022786a7f3e92149651ae7"
  }
};

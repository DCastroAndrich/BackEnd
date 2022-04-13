import knex from "knex";
import config from "../../config.js";

try {
  const messagesTable = knex(config.mariaDB);
  await messagesTable.schema.dropTableIfExists("messages");

  await messagesTable.schema.createTable("messages", (table) => {
    table.increments("id").primary();
    table.string("author", 50).notNullable();
    table.date("date");
    table.string("msg", 1024);
  });

  await messagesTable.destroy();

  console.log("Tabla messages en SQLite creada con éxito");
} catch (error) {
  console.log("Error al crear tabla");
  console.error(error);
}

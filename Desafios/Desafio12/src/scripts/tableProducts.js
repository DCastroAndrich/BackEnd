
import knex from "knex";
import config from "../../config.js";

try {
  const productTable = knex(config.mariaDB);
  await productTable.schema.dropTableIfExists("products");

  await productTable.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("name", 30).notNullable();
    table.float("price").notNullable();
    table.string("thumbnail", 1024);
  });

  await productTable.destroy();

  console.log("Tabla productos en mariaDb creada con éxito");
} catch (error) {
  console.log("Error al crear tabla");
  console.error(error);
}

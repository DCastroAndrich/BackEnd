const { options } = require("../../src/utils/optionsMySQL");

const knex = require("knex")(options);

knex.schema
  .createTable("products", (table) => {
    table.increments("id").primary();
    table.string("name", 25).notNullable();
    table.float("precio");
    table.string("thumbnail", 100);
  })
  .then(() => {
    console.log("Tabla creada!");
  })
  .catch((error) => {
    console.error(error);
    throw error;
  })
  .finally(() => {
    knex.destroy();
  });

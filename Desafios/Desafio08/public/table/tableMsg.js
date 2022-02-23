const { options } = require("../../src/utils/optionsSQLite");

const knex = require("knex")(options);

knex.schema
  .createTable("messages", (table) => {
    table.increments("id").primary();
    table.string("author", 25).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.string("message", 300).notNullable();
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

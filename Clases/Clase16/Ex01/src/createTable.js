const { options } = require("./utils/options");

const knex = require("knex")(options);

knex.schema
  .createTable("articulos", (table) => {
      table.string("nombre", 15).notNullable()
      table.string("codigo", 10).notNullable()
      table.float("precio");
      table.integer("stock");
      table.increments("id").primary();
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

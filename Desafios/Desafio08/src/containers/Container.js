const knexLib = require("knex");

class Container {
  constructor(options, tableName) {
    (this.knex = knexLib(options)), (this.tableName = tableName);
  }

  createTableMDB() {
    return this.knex.schema.dropTableIfExists(this.tableName).finally(() => {
      return this.knex.schema.createTable(this.tableName, (table) => {
        table.increments("id").primary();
        table.string("name", 30).notNullable();
        table.float("price");
        table.string("thumbnail", 200);
      });
    });
  }
  createTableSQL() {
    return this.knex.schema.dropTableIfExists(this.tableName).finally(() => {
      return this.knex.schema.createTable(this.tableName, (table) => {
        table.increments("id").primary();
        table.string("author", 50).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.string("message", 300);
      });
    });
  }

  listById(id) {
    return this.knex.from(this.tableName).select("*").where("id", id);
  }

  listAll() {
    return this.knex.from(this.tableName).select("*");
  }

  save(obj) {
    return this.knex(this.tableName).insert(obj);
  }

  updated(id, param) {
    return this.knex.from(this.tableName).where("id", id).update(param);
  }

  eraseById(id) {
    return this.knex.from(this.tableName).where("id", id).del();
  }

  eraseAll() {
    return this.knex.from(this.tableName).del();
  }

  closeConnection() {
    this.knex.destroy();
  }
}

module.exports = Container;

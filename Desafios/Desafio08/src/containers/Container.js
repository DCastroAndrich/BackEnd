const knexLib = require("knex");

class Container {
  constructor(options, tableName) {
    (this.knex = knexLib(options)), (this.tableName = tableName);
  }

  /*   createTableMDB() {
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
  } */

  async listById(id) {
    try {
      const byId = await this.knex
        .from(this.tableName)
        .select("*")
        .where("id", id);
      return byId;
    } catch (error) {
      console.error(error);
    }
  }

  async listAll() {
    try {
      const getAll = await this.knex.from(this.tableName).select("*");
      return getAll;
    } catch (error) {
      console.error(error);
    }
  }

  async save(obj) {
    try {
      const save = await this.knex(this.tableName).insert(obj);
      return save;
    } catch (error) {
      console.error(error);
    }
  }

  async updated(id, param) {
    try {
      const update = await this.knex
        .from(this.tableName)
        .where("id", id)
        .update(param);
      return update;
    } catch (error) {
      console.error();
    }
  }

  async eraseById(id) {
    try {
      const byId = await this.knex.from(this.tableName).where("id", id).del();
      return byId;
    } catch (error) {
      console.error(error);
    }
  }

  async eraseAll() {
    try {
      const del = await this.knex.from(this.tableName).del();
      return del;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Container;

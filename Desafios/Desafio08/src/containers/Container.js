const knexLib = require("knex");

class Container {
  constructor(options, table) {
    (this.knex = knexLib(options)), (this.table = table);
  }

  listById(id) {
    return this.knex.from(table).select("*").where("id", id);
  }

  listAll() {
    return this.knex.from(table).select("*");
  }

  save(obj) {
    return this.knex(table).insert(obj);
  }

  updated(id, param) {
    return this.knex.from(table).where("id", id).update(param);
  }

  eraseById(id) {
    return this.knex.from(table).where("id", id).del();
  }

  eraseAll() {
    return this.knex.from(table).del();
  }

  closeConnection() {
    this.knex.destroy();
  }
}

module.exports = Container;

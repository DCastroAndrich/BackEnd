const { promises: fs } = require("fs");

class ChatContainer {
  fileRoute;

  constructor(fileRoute) {
    this.fileRoute = fileRoute;
  }

  async getById(id) {
    try {
      const content = await this.getAll();

      let msgs = content.find((item) => item.id == id);

      return msgs;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const content = await fs.readFile(this.fileRoute, "utf-8");
      const arr = JSON.parse(content);
      return arr;
    } catch (error) {
      console.log(error);

      return [];
    }
  }

  async save(msg) {
    const content = await this.getAll();
    let newId;
    if (content.length === 0) {
      newId = 1;
    } else {
      newId = content[content.length - 1].id + 1;
    }

    const newMsg = { ...msg, id: newId };
    content.push(newMsg);

    try {
      await fs.writeFile(this.fileRoute, JSON.stringify(content, null, 2));

      return newId;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async update(msg, id) {
    const content = await this.getAll();
    let msgs = content.find((item) => item.id == id);
    if (msgs == -1) {
      throw new Error(`Error al modificar. ID: ${id} no encontrado`);
    } else {
      content[id] = msg;
      try {
        await fs.writeFile(this.fileRoute, JSON.stringify(content, null, 2));
      } catch (error) {
        throw new Error(`Error al borrar: ${error}`);
      }
    }
  }

  async deleteById(id) {
    const content = await this.getAll();

    const items = content.filter((item) => item.id != id);

    try {
      await fs.writeFile(this.fileRoute, JSON.stringify(items, null, 2));

      console.log(items);
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll() {
    const arr = [];
    try {
      await fs.writeFile(this.fileRoute, JSON.stringify(arr, null, 2));
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }
}
module.exports = ChatContainer;

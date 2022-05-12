import { promises as fs } from "fs";

class ContainerFS {
  fileroute;
  constructor(fileroute) {
    this.fileroute = fileroute;
  }

  async getAll() {
    try {
      const content = await fs.readFile(this.fileroute, "utf8");
      const arr = JSON.parse(content);
      return arr;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getById(id) {
    try {
      const content = await this.getAll();
      let obj = content.find((item) => item.id == id);

      return obj;
    } catch (error) {
      console.error(error);
      return { error: `elemento no encontrado` };
    }
  }

  async save(obj) {
    const content = await this.getAll();
    let newId;
    if (content.length === 0) {
      newId = 1;
    } else {
      newId = content[content.length - 1].id + 1;
    }

    const newObj = { id: newId, ...obj };
    content.push(newObj);

    try {
      await fs.writeFile(this.fileroute, JSON.stringify(content, null, 2));
      return newId;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async update(obj, id) {
    const content = await this.getAll();
    const updatedObj = { id: Number(id), ...obj };
    let items = content.find((item) => item.id == id);
    if (items == -1) {
      throw new Error(`Error al modificar. Id ${id} no encontrado`);
    } else {
      content[id] = updatedObj;
      try {
        await fs.writeFile(this.fileroute, JSON.stringify(content, null, 2));
      } catch (error) {
        throw new Error(`Error al modificar: ${error}`);
      }
    }
  }

  async deleteById(id) {
    const content = await this.getAll();
    const items = content.filter((item) => item.id != id);
    try {
      await fs.writeFile(this.fileroute, JSON.stringify(items, null, 2));
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }
}
export default ContainerFS;

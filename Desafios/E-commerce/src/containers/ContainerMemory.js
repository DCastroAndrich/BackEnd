class ContainerMemory {
  constructor() {
    this.array = [];
    this.id = 0;
  }

  getAll() {
    return [...this.array];
  }

  getById(id) {
    const obj = this.array.find((item) => item.id == id);
    return obj || { error: `elemento no encontrado` };
  }

  save(obj) {
    const newObj = { ...obj, id: ++this.id };
    this.array.push(newObj);
    return newObj;
  }

  update(obj, id) {
    const newObj = { id: Number(id), ...obj };
    const index = this.array.findIndex((item) => item.id == id);

    if (index !== -1) {
      this.array[index] = newObj;
      return newObj;
    } else {
      return { error: `elemento no encontrado` };
    }
  }

  deleteById(id) {
    const index = this.array.findIndex((item) => item.id == id);
    if (index !== -1) {
      return this.array.splice(index, 1);
    } else {
      return { error: `elemento no encontrado` };
    }
  }
}

export default ContainerMemory;

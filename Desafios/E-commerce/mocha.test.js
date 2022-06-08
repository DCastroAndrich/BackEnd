import ContainerMemory from "./src/containers/ContainerMemory.js";

import { strict as assert } from "assert";

describe("Test de integracion de tareas", function () {
  it("Debería traer todos los productos en la DB", function () {
    const test = new ContainerMemory();
    assert.strictEqual(test.getAll().length, 0);
  });

  it("Debería agregar el producto en la DB", function () {
    const test = new ContainerMemory();

    test.save({
      name: "Mouse",
      description: "Mouse wireless Bangho",
      thumbnail:
        "https://www.iconfinder.com/icons/2824437/lab_school_science_tube_icon",
      price: "17,50",
      stock: "10",
    });

    assert.strictEqual(test.getAll().length, 1);
    assert.deepStrictEqual(test.getAll(), [
      {
        name: "Mouse",
        id: 1,
        description: "Mouse wireless Bangho",
        thumbnail:
          "https://www.iconfinder.com/icons/2824437/lab_school_science_tube_icon",
        price: "17,50",
        stock: "10",
      },
    ]);
  });


  it("Debería traer el producto con el ID enviado", function () {
      const test = new ContainerMemory();
      assert.strictEqual(test.getById("1"), 1)
  })
});

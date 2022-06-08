import supertest from "supertest";

import { expect } from "chai";

const request = supertest("http://localhost:8080/api/productos");

describe("Test API restFull", () => {
  describe("GET", () => {
    it("debería retornar un status 200", async () => {
      const response = await request.get("/");
      expect(response.status).to.eql(200);
    });
  });

  describe("GET", () => {
    it("debería retornar un status 200", async () => {
      const response = await request.get("/:id").send("avRUs25r4YjtspImRqKR");
      expect(response.status).to.eql(200);
    });
  });
});

import request from "supertest";
import { app } from "../src/app";

describe("GET /health", () => {
  it("returns 200 with status ok", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("GET /expenses", () => {
  it("returns 200 with a list of expenses", async () => {
    const res = await request(app).get("/expenses");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("POST /expenses", () => {
  it("creates an expense when the payload is valid", async () => {
    const res = await request(app).post("/expenses").send({
      description: "Coffee",
      amount: 12.5,
      category: "food",
    });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      description: "Coffee",
      amount: 12.5,
      category: "food",
    });
    expect(res.body.id).toBeDefined();
    expect(res.body.createdAt).toBeDefined();
  });

  it("returns 400 when the payload is invalid", async () => {
    const res = await request(app).post("/expenses").send({
      description: "",
      amount: -10,
      category: "",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid request");
  });
});

describe("GET /expenses/:id", () => {
  it("returns 404 when the expense does not exist", async () => {
    const res = await request(app).get(
      "/expenses/00000000-0000-0000-0000-000000000000",
    );

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "Expense not found" });
  });

  it("returns 400 when the id is not a valid uuid", async () => {
    const res = await request(app).get("/expenses/id-inexistente");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid request");
  });
});

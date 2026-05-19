const request = require("supertest");
const app = require("../server");

describe("Todo API Tests", () => {

  test("GET / should work", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  test("POST /tasks should add task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ task: "Study" });

    expect(res.statusCode).toBe(201);
  });

  test("POST /tasks without task should fail", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({});

    expect(res.statusCode).toBe(400);
  });

  test("GET /tasks should return tasks", async () => {
    const res = await request(app).get("/tasks");

    expect(res.statusCode).toBe(200);
  });

  test("DELETE invalid task should fail", async () => {
    const res = await request(app).delete("/tasks/100");

    expect(res.statusCode).toBe(404);
  });

});
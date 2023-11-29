import request from "supertest";
import { serverTest } from "../../test-server";
import { response } from "express";
import { prisma } from "../../../src/data/postgres";

describe("Todo routes testing", () => {
  beforeAll(async () => {
    await serverTest.start();
  });

  afterAll(() => {
    serverTest.close();
  });

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  const todo1 = { text: "Holi bebe" };
  const todo2 = { text: "Chau bebe" };
  test("should return Todos", async () => {
    await prisma.todo.createMany({ data: [todo1, todo2] });

    const { body } = await request(serverTest.app)
      .get("/api/todos")
      .expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].text).toBe(todo1.text);
  });

  test("should return Todo by id", async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(serverTest.app).get(`/api/todos/${todo.id}`);

    expect(body).toEqual({
      id: todo.id,
      completedAt: todo.completedAt,
      text: todo.text,
    });
  });

  test("should return id not found", async () => {
    const todo = await prisma.todo.create({ data: todo1 });
    const id = 999;

    const { body } = await request(serverTest.app)
      .get(`/api/todos/${id}`)
      .expect(400);

    expect(body).toEqual({
      error: `Id ${id} not found`,
    });
  });

  test("Should create a Todo", async () => {
    const newTodo = { text: "Holi adios" };

    const { body } = await request(serverTest.app)
      .post("/api/todos")
      .send(newTodo)
      .expect(200);

    expect(body).toEqual({
      text: newTodo.text,
      id: expect.any(Number),
      completedAt: null,
    });
  });
  test("Should return error when the text is empty", async () => {
    const newTodo = { text: "" };

    const { body } = await request(serverTest.app)
      .post("/api/todos")
      .send(newTodo)
      .expect(400);

    expect(body).toEqual({
      error: "Text property is required",
    });
  });

  test("Should updated  todo", async () => {
    const todo = { text: "I need " };

    const { body } = await request(serverTest.app)
      .post("/api/todos")
      .send(todo);

    const updatedTodo = { text: "I need updated" };

    const todoUpdate = await request(serverTest.app)
      .put(`/api/todos/${body.id}`)
      .send(updatedTodo)
      .expect(200);

    expect(todoUpdate.body).toEqual({
      id: expect.any(Number),
      text: "I need updated",
      completedAt: null,
    });
  });

  test("Should return todo not found", async () => {
    const todo = { text: "I need " };

    await request(serverTest.app).post("/api/todos").send(todo);

    const updatedTodo = { text: "I need updated" };

    const todoUpdate = await request(serverTest.app)
      .put(`/api/todos/${999}`)
      .send(updatedTodo)
      .expect(400);

    expect(todoUpdate.body).toEqual({ error: "Id 999 not found" });
  });

  test("Should delete todo", async () => {
    const todo = { text: "I need leave" };
    const { body } = await request(serverTest.app)
      .post("/api/todos")
      .send(todo)
      .expect(200);

    await request(serverTest.app).delete(`/api/todos/${body.id}`);

    const { body: allTodos } = await request(serverTest.app)
      .get("/api/todos")
      .expect(200);

    expect(allTodos).toEqual([]);
  });
});

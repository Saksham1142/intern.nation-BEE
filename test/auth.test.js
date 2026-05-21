const request = require("supertest");
const app = require("../backend/app");

describe("Auth API Testing", () => {

  // ========================
  // SIGNUP SUCCESS TEST
  // ========================
  test("Signup should create a new user", async () => {

    const response = await request(app)
      .post("/signup")
      .send({
        name: "Test User",
        email: `test${Date.now()}@gmail.com`,
        password: "123456",
        confirmPassword: "123456"
      });

    expect(response.statusCode).toBe(200);

  });

  // ========================
  // MISSING EMAIL TEST
  // ========================
  test("Signup should fail without email", async () => {

    const response = await request(app)
      .post("/signup")
      .send({
        name: "Test User",
        password: "123456",
        confirmPassword: "123456"
      });

    expect(response.statusCode).toBe(400);

  });

  // ========================
  // PASSWORD MISMATCH TEST
  // ========================
  test("Signup should fail if passwords do not match", async () => {

    const response = await request(app)
      .post("/signup")
      .send({
        name: "Test User",
        email: `test${Date.now()}@gmail.com`,
        password: "123456",
        confirmPassword: "wrongpassword"
      });

    expect(response.statusCode).toBe(400);

  });

  // ========================
  // LOGIN SUCCESS TEST
  // ========================
  test("Login should work with valid credentials", async () => {

    const email = `login${Date.now()}@gmail.com`;

    // create user first
    await request(app)
      .post("/signup")
      .send({
        name: "Login User",
        email,
        password: "123456",
        confirmPassword: "123456"
      });

    // now login
    const response = await request(app)
      .post("/login")
      .send({
        email,
        password: "123456"
      });

    expect(response.statusCode).toBe(200);

  });

  // ========================
  // LOGIN WRONG PASSWORD
  // ========================
  test("Login should fail with wrong password", async () => {

    const email = `wrongpass${Date.now()}@gmail.com`;

    // create user first
    await request(app)
      .post("/signup")
      .send({
        name: "Wrong Password User",
        email,
        password: "123456",
        confirmPassword: "123456"
      });

    // wrong login
    const response = await request(app)
      .post("/login")
      .send({
        email,
        password: "wrongpassword"
      });

    expect(response.statusCode).toBe(401);

  });

  // ========================
  // LOGIN USER NOT FOUND
  // ========================
  test("Login should fail for non-existing user", async () => {

    const response = await request(app)
      .post("/login")
      .send({
        email: "nouser@gmail.com",
        password: "123456"
      });

    expect(response.statusCode).toBe(401);

  });

});
/** @format */

const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");

const Note = require("../models/note");
const api = supertest(app);

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
});

describe("notes tester", () => {
  test("a valid note can be added", async () => {
    const newNote = {
      content: "async/await simplifies making async calls",
      important: false,
    };

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/notes");

    const contents = response.body.map((note) => note.content);

    /*   assert.strictEqual(
      contents.includes("async/await simplifies making async calls")
    ); */
    assert.deepEqual(contents, [
      "HTML is easy",
      "Browser can execute only JavaScript",
      "async/await simplifies making async calls",
    ]);
  });
});

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two notes", async () => {
  const response = await api.get("/api/notes");

  assert.strictEqual(response.body.length, 2);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((e) => e.content);
  assert.strictEqual(contents.includes("HTML is easy"), true);
});

after(async () => {
  await mongoose.connection.close();
});

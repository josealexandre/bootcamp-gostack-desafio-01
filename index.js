const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
let count = 0;

const checkIfExists = (req, res, next) => {
  const { id } = req.params;

  const index = projects.findIndex(project => project.id == id);

  return index >= 0
    ? next()
    : res.status(400).json({ error: "Project does not exists" });
};

server.use((req, res, next) => {
  count++;
  console.log(count);
  next();
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const project = req.body;
  projects.push(project);

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkIfExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = projects.findIndex(project => project.id == id);
  projects[index].tasks.push(title);

  res.json(projects);
});

server.put("/projects/:id", checkIfExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = projects.findIndex(project => project.id == id);
  projects[index].title = title;

  return res.json(projects);
});

server.delete("/projects/:id", checkIfExists, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(project => project.id == id);

  projects.splice(index, 1);

  res.send();
});

server.listen(3000);

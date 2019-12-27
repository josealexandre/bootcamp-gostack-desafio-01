const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const project = req.body;
  projects.push(project);

  return res.json(projects);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = projects.findIndex(project => project.id == id);
  projects[index].title = title;

  return res.json(projects);
});

server.listen(3000);

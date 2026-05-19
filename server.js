const express = require("express");
const app = express();

app.use(express.json());

let tasks = [];

app.get("/", (req, res) => {
  res.send("Todo API Running");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const task = req.body.task;

  if (!task) {
    return res.status(400).json({
      error: "Task is required",
    });
  }

  tasks.push(task);

  res.status(201).json({
    message: "Task added",
  });
});

app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;

  if (id >= tasks.length) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  tasks.splice(id, 1);

  res.json({
    message: "Task deleted",
  });
});

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}
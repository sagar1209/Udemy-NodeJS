const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

const Task = require("../models/task");

router.get("/tasks/:id",auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await User.findById(_id);
    if (!task) return res.status(404).send();
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
  //   Task.findById(_id)
  //     .then((result) => {
  //       if (!result) return res.status(404).send();
  //       res.status(201).send(result);
  //     })
  //     .catch((error) => {
  //       res.status(500).send(error);
  //     });
});

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
  const match = {}
  const sort = {}

  if (req.query.completed) {
      match.completed = req.query.completed === 'true'
  }

  if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':')
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
      await req.user.populate({
          path: 'tasks',
          match,
          options: {
              limit: parseInt(req.query.limit),
              skip: parseInt(req.query.skip),
              sort
          }
      })
      res.send(req.user.tasks)
  } catch (e) {
      res.status(500).send()
  }
})

router.patch("/tasks/:id",auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["description", "completed"];
  const isValidopration = updates.every((update) => {
    return allowedUpdate.includes(update);
  });
  if (!isValidopration) {
    res.status(400).send({ error: "invalid upadates" });
  }

  try {
    const task = await Task.findById(req.params.id);
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id",auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

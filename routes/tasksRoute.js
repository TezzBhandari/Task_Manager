const express = require('express');
const createError = require('http-errors');

const router = express.Router();

const {
  getAllTasks,
  createTask,
  deleteAllTasks,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks_op');

router
  .route('/')
  .get(getAllTasks)
  .post(createTask)
  .put((req, res, next) => {
    next(createError(405, 'Put Method is not  Supported on this Route'));
  })
  .delete(deleteAllTasks);

router
  .route('/:id')
  .get(getTask)
  .post((req, res, next) => {
    next(createError(405, 'Post Method is not Supportedd on this Route'));
  })
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;

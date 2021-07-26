const Task = require('../models/tasksModel');
const createError = require('http-errors');

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({})
      .select({ name: 1, completed: 1 })
      .sort({ name: 1 }); // query helps in chaining helper function;
    res.status(200).json({
      success: true,
      msg: 'Successfully retrieved all the tasks',
      response: tasks,
    });
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      success: true,
      msg: 'Task Sucesfully created',
      response: task,
    });
  } catch (err) {
    next(err);
  }
};

const deleteAllTasks = async (req, res, next) => {
  try {
    const resp = await Task.deleteMany({});
    res.status(200).json({
      success: true,
      msg: `Deleted ${resp.deletedCount} items`,
      response: resp,
    });
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId }).select({
      name: 1,
      completed: 1,
    });

    if (!task) {
      return next(createError(404, `No Task With an ID of ${taskId}`));
    }
    res.status(200).json({
      success: true,
      msg: `Successfully retrieved the task with an id of ${taskId}`,
      response: task,
    });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return next(createError(404, `No Task With an ID of ${taskId}`));
    }
    res.status(200).json({
      success: true,
      msg: `Successfully Update the task with an ID of ${taskId}`,
      response: task,
    });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return next(createError(404, `No Task With an ID of ${taskId}`));
    }
    res.status(200).json({
      success: true,
      msg: `Successfully deleted the task with an id of ${taskId}`,
      response: task,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  deleteAllTasks,
  getTask,
  updateTask,
  deleteTask,
};

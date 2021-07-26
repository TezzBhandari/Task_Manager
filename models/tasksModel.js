const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You must provide name'],
    maxlength: [20, 'Name cannot be less than 20 character'],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;

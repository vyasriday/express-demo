var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var toDoSchema = new Schema({
  id: { type: Number },
  title: { type: String, required: true },
  done: { type: Boolean, default: false }
});

var Todo = mongoose.model('Todo', toDoSchema);

module.exports = Todo;
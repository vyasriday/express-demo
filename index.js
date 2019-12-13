const Joi = require('@hapi/joi');
const express = require('express');
const bodyParser = require('body-parser');

var Todo = require('./models/Todo');

const app = express();
const port = process.env.PORT || 8080;

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://<username>:<password>@cluster0-sjw6m.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

// let todos = []

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Express Session!!!</h1>')
})

app.get('/todos', (req, res) => {
  Todo.find({}, function (err, todos) {
    res.status(200).send(todos);
  });
})

app.get('/todo/:title', (req, res) => {
  Todo.find({'title': req.params.title}, function (err, todos) {
    res.status(200).send(todos);
  });
})

app.get('/todo/:id', (req, res) => {
  Todo.findById(req.params.id, function (err, todos) {
    res.status(200).send(todos);
  });
})

app.post('/todo/create', (req, res) => {
  new Todo({
    title: req.body.title,
    done: req.body.done
  }).save(function (err, todo, count) {
    if (err) return next(err);
    res.status(200).send(todo);
  });
})

app.put('/todo/update/:id', (req, res) => {
  Todo.findOneAndUpdate({ _id: req.params.id }, {'title': req.body.title}, { upsert: true }, function (err, doc) {
    if (err) return res.send(500, { error: err });
    return res.send('Succesfully updated.');
  });
})

app.delete('/todo/delete/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id, function(err){
    return res.status(200).send({'message': "Item has been deleted"});
  });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

// ------- Passing multiple callbacks in routes ---------

// app.get('/', (req, res, next) => {
//   res.send('Hello World!!!');
//   next();
// }, (req, res) => {
//   console.log('Next callback is caled!!!');
// })

// -------- Path Params Hacks -----------

// app.get('/flights/:from-:to', (req,res)=> {
//   console.log(req.params);
// })

// app.get('/dots/:ones.:decimal', (req, res) => {
//   console.log(req.params);
// })

// --------- Adding Validations to your routes ------------

// const schema = Joi.object({
//   title: Joi.string().min(5).required()
// })

// app.post('/post', (req, res) => {
//   const validations = schema.validate(req.body);
//   const {error, value} = validations;
//   if (error) {
//     return res.status(400).send(error.details[0].message);
//   } else {
//     res.status(200).send(value)
//   } 
// })

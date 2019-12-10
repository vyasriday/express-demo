const Joi = require('@hapi/joi'); 
const express = require('express');
const bodyParser = require('body-parser'); 

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended : false}))
app.use(express.json())

let todos = []

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Express Session!!!</h1>')
})

app.get('/todos', (req, res) => {
  res.status(200).send(todos);
})

app.get('/todo/bytitle', (req, res) => {
  const todo = todos.find(todo => req.query.title === todo.title)

  if(!todo) {
    res.status(400).send('Todo not found!!!')
  } else {
    res.status(200).send(todo)
  }
})

app.get('/todo/:id', (req, res) => {
  const todo = todos.find((todo) => todo.id == req.params.id)

  if(!todo) {
    res.status(400).send('Todo not found!!!');
  } else {
    res.status(200).send(todo);
  }
})

app.post('/todo/create', (req, res) => {
  const todo  = {
    id : Math.round(Math.random()*110101),
    title: req.body.title
  }
  todos.push(todo);
  res.status(200).send(todo);
})

app.put('/todo/update/:id', (req, res) => {
  const id = req.params.id;
  todos.map(todo => {
    if(todo.id === parseInt(id)) {
      todo.title = req.body.title;
      res.status(200).send(todo)
      return todo;
    } else {
      res.status(400).send('Todo not found!!!')
      return todo;
    }
  })
})

app.delete('/todo/delete/:id', (req, res) => {
  const id = req.params.id;
  todos = todos.filter(todo => todo.id !== id)
  return res.status(200).send(todos);
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

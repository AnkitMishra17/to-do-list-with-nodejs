const bodyparser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://Ankit:Ankits2@ds241664.mlab.com:41664/todo-app-database', {useNewUrlParser: true });

let todoSchema = new mongoose.Schema({
  item: String
});

let Todo = mongoose.model('Todo', todoSchema);

//let data = [{item: 'Play PUBG'},{item: 'Watch a Movie'}, {item: 'Go Out with Friends'}];
const urlencodedparser = bodyparser.urlencoded({extended:false});

module.exports = (app) =>{

  app.get('/todo', (req,res) =>{
    Todo.find({}, (err,data)=>{
      if (err) throw err;
      res.render('todo',{todos : data});
    })
});

app.post('/todo', urlencodedparser, (req,res) =>{

  let newTodo = Todo(req.body).save((err,data)=>{
    if (err) throw err;
    res.json(data);
  })
});

app.delete('/todo/:item', (req,res) =>{

  Todo.find({item: req.params.item.replace(/\-/g," ")}).remove((err,data)=>{
    if (err) throw err;
    res.json(data);
  })
});

}

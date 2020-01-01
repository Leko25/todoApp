var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb+srv://leko25:Machine_11251994@todo-wdb2u.mongodb.net/test?retryWrites=true&w=majority');

//Create a new schema
var todoSchema = new mongoose.Schema({
  item: String
});

//Create model
var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: "write code"}).save(function(err){
//   if(err) throw err;
//   console.log('item saved');
// });

// var data = [{item: "Research"}, {item: "Study"}, {item: "Listen to music"}];
module.exports = function(app){

  app.get('/todo', (req, res)=>{
    //get data from database and pass it to the view
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, (req, res)=>{
    //get data from view and add it to the database
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', (req, res)=>{
    //delete item from database
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if(err) throw err;
      res.json(data);
    });
    // data = data.filter(function(item){
    //   //If true: item remains within the array
    //   //else: item is filtered out of the array
    //   return item.item.replace(/ /g, "-") !== req.params.item;
    // });
    // res.json(data);
  });
};

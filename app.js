var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//setup template engine
app.set('view engine', 'ejs');

//enable static files in public
app.use(express.static('./public'));

//enable controller
todoController(app);

app.listen(3000);
console.log('Now, listening to port 3000');
